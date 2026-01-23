
from fastapi import APIRouter, HTTPException
from datetime import datetime
import uuid
import os
import httpx
from ..models import KhaltiPayment, PaymentResponse

router = APIRouter(prefix="/payment")

# Payment history (in-memory for MVP; use database in production)
payment_history = []

# Khalti Configuration
KHALTI_SECRET_KEY = os.getenv("KHALTI_SECRET_KEY", "test-khalti-secret")
KHALTI_PUBLIC_KEY = os.getenv("KHALTI_PUBLIC_KEY", "test-khalti-public")
KHALTI_VERIFY_URL = "https://khalti.com/api/v2/payment/verify/"

# eSewa Configuration
ESEWA_MERCHANT_CODE = os.getenv("ESEWA_MERCHANT_CODE", "EPAYTEST")
ESEWA_MERCHANT_PASSWORD = os.getenv("ESEWA_MERCHANT_PASSWORD", "test-password")
ESEWA_SUCCESS_URL = os.getenv("ESEWA_SUCCESS_URL", "https://yourdomain.com/payment/success")
ESEWA_FAILURE_URL = os.getenv("ESEWA_FAILURE_URL", "https://yourdomain.com/payment/failure")
ESEWA_VERIFY_URL = "https://uat.esewa.com.np/api/epay/transaction/status/"

@router.post("/khalti/initiate", response_model=PaymentResponse)
def khalti_initiate(payment: KhaltiPayment):
    """
    Initiate Khalti payment
    Returns token_url for client to redirect to
    """
    try:
        # In production, call Khalti API
        # This is a mock response for MVP
        payment_id = str(uuid.uuid4())
        
        payment_data = {
            "id": payment_id,
            "amount": payment.amount,
            "service": payment.service,
            "email": payment.email,
            "phone": payment.phone,
            "return_url": payment.return_url or "http://localhost:3000/payment/success",
            "website_url": "http://localhost:3000",
            "amount_minor": payment.amount * 100,  # Khalti uses smallest currency unit
            "created_at": datetime.utcnow().isoformat(),
            "status": "pending"
        }
        
        payment_history.append(payment_data)
        
        return PaymentResponse(
            status="initiated",
            message="Payment initiated successfully",
            payment_id=payment_id,
            token_url=f"https://khalti.com/checkout/?token={payment_id}",
            amount=payment.amount
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/khalti/verify", response_model=PaymentResponse)
def khalti_verify(token: str, amount: int):
    """
    Verify Khalti payment
    In production, call Khalti API with token
    """
    try:
        # Mock verification - in production, call KHALTI_VERIFY_URL
        payment = next((p for p in payment_history if p.get("id") == token), None)
        
        if not payment:
            raise HTTPException(status_code=404, detail="Payment not found")
        
        if payment.get("amount") != amount:
            raise HTTPException(status_code=400, detail="Amount mismatch")
        
        payment["status"] = "completed"
        payment["verified_at"] = datetime.utcnow().isoformat()
        
        return PaymentResponse(
            status="verified",
            message="Payment verified successfully",
            payment_id=token,
            amount=amount
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/khalti/webhook")
def khalti_webhook(data: dict):
    """
    Webhook endpoint for Khalti payment notifications
    Khalti will POST to this endpoint after payment completion
    """
    try:
        token = data.get("token")
        amount = data.get("amount")
        
        # Verify payment with Khalti
        # In production: call KHALTI_VERIFY_URL
        
        payment = next((p for p in payment_history if p.get("id") == token), None)
        if payment:
            payment["status"] = "webhook_received"
            return {"status": "success", "message": "Webhook received"}
        
        return {"status": "error", "message": "Payment not found"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@router.post("/esewa/initiate", response_model=PaymentResponse)
def esewa_initiate(payment: KhaltiPayment):
    """
    Initiate eSewa payment
    Returns redirect_url for client to redirect to
    """
    try:
        payment_id = str(uuid.uuid4())
        
        payment_data = {
            "id": payment_id,
            "amount": payment.amount,
            "service": payment.service,
            "email": payment.email,
            "phone": payment.phone,
            "merchant_code": ESEWA_MERCHANT_CODE,
            "created_at": datetime.utcnow().isoformat(),
            "status": "pending"
        }
        
        payment_history.append(payment_data)
        
        # Build eSewa payment URL
        esewa_url = (
            f"https://uat.esewa.com.np/epay/main?tAmt={payment.amount}"
            f"&amt={payment.amount}&txAmt=0&psc=0&pdc=0"
            f"&scd={ESEWA_MERCHANT_CODE}&pid={payment_id}"
            f"&su={ESEWA_SUCCESS_URL}&fu={ESEWA_FAILURE_URL}"
        )
        
        return PaymentResponse(
            status="initiated",
            message="Payment initiated successfully",
            payment_id=payment_id,
            token_url=esewa_url,
            amount=payment.amount
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/esewa/verify", response_model=PaymentResponse)
def esewa_verify(ref_id: str):
    """
    Verify eSewa payment
    ref_id is provided by eSewa after successful payment
    """
    try:
        payment = next((p for p in payment_history if p.get("id") == ref_id), None)
        
        if not payment:
            raise HTTPException(status_code=404, detail="Payment not found")
        
        # In production, verify with eSewa API
        payment["status"] = "completed"
        payment["verified_at"] = datetime.utcnow().isoformat()
        
        return PaymentResponse(
            status="verified",
            message="Payment verified successfully",
            payment_id=ref_id,
            amount=payment.get("amount")
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/history")
def payment_history_list(limit: int = 50):
    """Get recent payment history (admin only in production)"""
    return {
        "total": len(payment_history),
        "payments": payment_history[-limit:]
    }

@router.get("/stats")
def payment_stats():
    """Get payment statistics"""
    completed = len([p for p in payment_history if p.get("status") == "completed"])
    total_amount = sum(p.get("amount", 0) for p in payment_history if p.get("status") == "completed")
    
    return {
        "total_transactions": len(payment_history),
        "completed_transactions": completed,
        "total_revenue": total_amount,
        "pending_transactions": len([p for p in payment_history if p.get("status") == "pending"])
    }
