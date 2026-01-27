"""
Payment Router
Handles payment processing with Khalti and eSewa integration
"""

from fastapi import APIRouter, HTTPException, Depends
from datetime import datetime
from sqlalchemy.orm import Session
import uuid
import os
import httpx

from ..models import KhaltiPayment, PaymentResponse
from ..database.connection import get_db
from ..database.models import Payment as PaymentModel

router = APIRouter(prefix="/payment")

# Khalti Configuration
KHALTI_SECRET_KEY = os.getenv("KHALTI_SECRET_KEY", "")
KHALTI_PUBLIC_KEY = os.getenv("KHALTI_PUBLIC_KEY", "")
KHALTI_VERIFY_URL = os.getenv("KHALTI_VERIFY_URL", "https://khalti.com/api/v2/payment/verify/")

# eSewa Configuration
ESEWA_MERCHANT_CODE = os.getenv("ESEWA_MERCHANT_CODE", "EPAYTEST")
ESEWA_MERCHANT_PASSWORD = os.getenv("ESEWA_MERCHANT_PASSWORD", "")
ESEWA_SUCCESS_URL = os.getenv("ESEWA_SUCCESS_URL", "http://localhost:3000/payment/success")
ESEWA_FAILURE_URL = os.getenv("ESEWA_FAILURE_URL", "http://localhost:3000/payment/failure")
ESEWA_VERIFY_URL = os.getenv("ESEWA_VERIFY_URL", "https://uat.esewa.com.np/api/epay/transaction/status/")


@router.post("/khalti/initiate", response_model=PaymentResponse)
def khalti_initiate(payment: KhaltiPayment, db: Session = Depends(get_db)):
    """
    Initiate Khalti payment
    Returns token_url for client to redirect to
    """
    try:
        payment_id = str(uuid.uuid4())
        
        # Store payment record in database
        db_payment = PaymentModel(
            id=payment_id,
            transaction_id=payment_id,
            customer_name=payment.customer_name,
            customer_email=payment.customer_email,
            amount=payment.amount,
            currency="NPR",
            status="pending",
            payment_method="khalti",
            description=payment.description,
            return_url=payment.return_url
        )
        
        db.add(db_payment)
        db.commit()
        db.refresh(db_payment)
        
        return PaymentResponse(
            status="initiated",
            transaction_id=payment_id,
            message="Payment initiated successfully",
            payment_url=f"https://khalti.com/checkout/?token={payment_id}"
        )
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/khalti/verify", response_model=PaymentResponse)
def khalti_verify(token: str, amount: int, db: Session = Depends(get_db)):
    """
    Verify Khalti payment
    In production, call Khalti API with token
    """
    try:
        payment = db.query(PaymentModel).filter(
            PaymentModel.transaction_id == token,
            PaymentModel.payment_method == "khalti"
        ).first()
        
        if not payment:
            raise HTTPException(status_code=404, detail="Payment not found")
        
        if payment.amount != amount:
            raise HTTPException(status_code=400, detail="Amount mismatch")
        
        payment.status = "completed"
        db.commit()
        db.refresh(payment)
        
        return PaymentResponse(
            status="verified",
            transaction_id=token,
            message="Payment verified successfully"
        )
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/khalti/webhook")
def khalti_webhook(data: dict, db: Session = Depends(get_db)):
    """
    Webhook endpoint for Khalti payment notifications
    Khalti will POST to this endpoint after payment completion
    """
    try:
        token = data.get("token")
        
        payment = db.query(PaymentModel).filter(
            PaymentModel.transaction_id == token
        ).first()
        
        if payment:
            payment.status = "completed"
            db.commit()
            return {"status": "success", "message": "Webhook processed"}
        
        return {"status": "error", "message": "Payment not found"}
    except Exception as e:
        db.rollback()
        return {"status": "error", "message": str(e)}


@router.post("/esewa/initiate", response_model=PaymentResponse)
def esewa_initiate(payment: KhaltiPayment, db: Session = Depends(get_db)):
    """
    Initiate eSewa payment
    Returns redirect_url for client to redirect to
    """
    try:
        payment_id = str(uuid.uuid4())
        
        # Store payment record in database
        db_payment = PaymentModel(
            id=payment_id,
            transaction_id=payment_id,
            customer_name=payment.customer_name,
            customer_email=payment.customer_email,
            amount=payment.amount,
            currency="NPR",
            status="pending",
            payment_method="esewa",
            description=payment.description
        )
        
        db.add(db_payment)
        db.commit()
        db.refresh(db_payment)
        
        # Build eSewa payment URL
        esewa_url = (
            f"https://uat.esewa.com.np/epay/main?tAmt={payment.amount}"
            f"&amt={payment.amount}&txAmt=0&psc=0&pdc=0"
            f"&scd={ESEWA_MERCHANT_CODE}&pid={payment_id}"
            f"&su={ESEWA_SUCCESS_URL}&fu={ESEWA_FAILURE_URL}"
        )
        
        return PaymentResponse(
            status="initiated",
            transaction_id=payment_id,
            message="Payment initiated successfully",
            payment_url=esewa_url
        )
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/esewa/verify", response_model=PaymentResponse)
def esewa_verify(ref_id: str, db: Session = Depends(get_db)):
    """
    Verify eSewa payment
    ref_id is provided by eSewa after successful payment
    """
    try:
        payment = db.query(PaymentModel).filter(
            PaymentModel.transaction_id == ref_id,
            PaymentModel.payment_method == "esewa"
        ).first()
        
        if not payment:
            raise HTTPException(status_code=404, detail="Payment not found")
        
        payment.status = "completed"
        db.commit()
        db.refresh(payment)
        
        return PaymentResponse(
            status="verified",
            transaction_id=ref_id,
            message="Payment verified successfully"
        )
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/history")
def payment_history_list(limit: int = 50, db: Session = Depends(get_db)):
    """Get recent payment history"""
    payments = db.query(PaymentModel).order_by(PaymentModel.created_at.desc()).limit(limit).all()
    return {
        "total": len(payments),
        "payments": [
            {
                "id": p.id,
                "transaction_id": p.transaction_id,
                "customer_name": p.customer_name,
                "amount": p.amount,
                "status": p.status,
                "payment_method": p.payment_method,
                "created_at": p.created_at.isoformat(),
            }
            for p in payments
        ]
    }


@router.get("/stats")
def payment_stats(db: Session = Depends(get_db)):
    """Get payment statistics"""
    all_payments = db.query(PaymentModel).all()
    completed = [p for p in all_payments if p.status == "completed"]
    total_revenue = sum(p.amount for p in completed)
    
    return {
        "total_transactions": len(all_payments),
        "completed_transactions": len(completed),
        "total_revenue": total_revenue,
        "pending_transactions": len([p for p in all_payments if p.status == "pending"])
    }
