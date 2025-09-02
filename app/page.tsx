'use client'

import { useState } from 'react'
import { BasePayButton } from '@/components/BasePayButton'

interface LostItem {
    id: string
    title: string
    description: string
    location: string
    reward: string
    status: 'active' | 'found'
    owner: string
    picture?: string
}

export default function Home() {
    const [lostItems] = useState<LostItem[]>([
        {
            id: '1',
            title: 'Lost iPhone 14 Pro',
            description: 'Black iPhone 14 Pro with cracked screen. Lost near Central Park yesterday.',
            location: 'Central Park, New York',
            reward: '25.00',
            status: 'active',
            owner: '0x1234...5678',
            picture: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzMzMzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+aVBob25lIDE0IFBybzwvdGV4dD48L3N2Zz4='
        },
        {
            id: '2',
            title: 'Lost Wallet - Brown Leather',
            description: 'Brown leather wallet with ID and credit cards. Last seen at Starbucks.',
            location: 'Starbucks, 5th Avenue',
            reward: '15.00',
            status: 'active',
            owner: '0x8765...4321',
            picture: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzg0NjY0NCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+V2FsbGV0PC90ZXh0Pjwvc3ZnPg=='
        }
    ])

    return (
        <div>
            <div className="header">
                <h1>🔍 LnF</h1>
                <p>Lost n Found - Find what you've lost with Base Pay</p>
            </div>

            <div className="container">
                <div className="grid">
                    {lostItems.map((item) => (
                        <div key={item.id} className="card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937' }}>
                                    {item.title}
                                </h3>
                                <span className={`status ${item.status}`}>
                                    {item.status}
                                </span>
                            </div>

                            <div style={{ marginBottom: '16px' }}>
                                <h4 style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                                    Description:
                                </h4>
                                <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: '1.5' }}>
                                    {item.description}
                                </p>
                            </div>

                            {item.picture && (
                                <div style={{ marginBottom: '16px' }}>
                                    <h4 style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                                        📷 Picture: 🔒 Private
                                    </h4>
                                    <div className="picture-placeholder">
                                        <span>Click to view picture</span>
                                    </div>
                                </div>
                            )}

                            <div style={{ marginBottom: '16px' }}>
                                <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '4px' }}>
                                    📍 {item.location}
                                </p>
                                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                                    👤 Owner: {item.owner}
                                </p>
                            </div>

                            <BasePayButton
                                amount={item.reward}
                                recipientAddress={item.owner}
                                itemId={item.id}
                                disabled={item.status !== 'active'}
                            />

                            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                                <button className="btn" style={{ flex: 1, fontSize: '0.875rem' }}>
                                    👁️ Details
                                </button>
                                {item.status === 'active' && (
                                    <button className="btn" style={{ flex: 1, fontSize: '0.875rem' }}>
                                        ✅ Found It
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}