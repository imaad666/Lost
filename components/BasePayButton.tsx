'use client'

import { useState } from 'react'

interface BasePayButtonProps {
    amount: string
    recipientAddress: string
    itemId: string
    disabled?: boolean
}

export function BasePayButton({ amount, recipientAddress, itemId, disabled = false }: BasePayButtonProps) {
    const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')
    const [paymentId, setPaymentId] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')

    const handlePayment = async () => {
        try {
            setPaymentStatus('processing')
            setErrorMessage('')

            // Check if Base Pay is available
            if (typeof window !== 'undefined' && (window as any).base) {
                // Real Base Pay integration
                const payment = await (window as any).base.pay({
                    amount: amount,
                    to: recipientAddress,
                    testnet: process.env.NODE_ENV === 'development'
                })

                setPaymentId(payment.id)

                // Poll for payment status
                const pollStatus = async () => {
                    try {
                        const { status } = await (window as any).base.getPaymentStatus({
                            id: payment.id,
                            testnet: process.env.NODE_ENV === 'development'
                        })

                        if (status === 'completed') {
                            setPaymentStatus('success')
                        } else if (status === 'failed' || status === 'cancelled') {
                            setPaymentStatus('error')
                            setErrorMessage('Payment was cancelled or failed')
                        } else {
                            setTimeout(pollStatus, 2000)
                        }
                    } catch (error) {
                        setPaymentStatus('error')
                        setErrorMessage('Error checking payment status')
                    }
                }

                setTimeout(pollStatus, 2000)
            } else {
                // Fallback simulation for demo
                console.log(`Simulating payment of ${amount} USDC to ${recipientAddress}`)

                await new Promise(resolve => setTimeout(resolve, 2000))

                const mockPaymentId = `pay_${Date.now()}`
                setPaymentId(mockPaymentId)
                setPaymentStatus('success')
            }

        } catch (error: any) {
            console.error('Payment failed:', error)
            setPaymentStatus('error')
            setErrorMessage(error.message || 'Payment failed')
        }
    }

    if (paymentStatus === 'success') {
        return (
            <div className="payment-success">
                ✅ Payment Successful! Transaction ID: {paymentId.slice(0, 8)}...
            </div>
        )
    }

    if (paymentStatus === 'error') {
        return (
            <div className="payment-error">
                ❌ Payment Failed: {errorMessage}
                <button
                    onClick={() => {
                        setPaymentStatus('idle')
                        setErrorMessage('')
                    }}
                    className="btn"
                    style={{ marginTop: '8px', fontSize: '0.875rem' }}
                >
                    Try Again
                </button>
            </div>
        )
    }

    return (
        <div>
            <button
                onClick={handlePayment}
                disabled={disabled || paymentStatus === 'processing'}
                className="btn"
                style={{ width: '100%', fontSize: '1rem' }}
            >
                {paymentStatus === 'processing' ? (
                    <>⏳ Processing Payment...</>
                ) : (
                    <>💳 Pay {amount} USDC</>
                )}
            </button>

            {paymentStatus === 'processing' && (
                <p style={{ textAlign: 'center', fontSize: '0.875rem', color: '#6b7280', marginTop: '8px' }}>
                    Please complete the payment in your wallet
                </p>
            )}
        </div>
    )
}