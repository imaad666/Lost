# LnF - Lost n Found (Minimal)

A lightweight lost and found application with Base Pay integration

## Features

- 🔍 **Lost Item Display**: Clean cards showing lost items
- 💳 **Base Pay Integration**: One-click USDC payments
- 🔒 **Private Pictures**: Secure image storage for item owners
- 📱 **Responsive Design**: Works on all devices
- ⚡ **Lightweight**: Minimal dependencies for fast deployment

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run development server**
   ```bash
   npm run dev
   ```

3. **Deploy to Vercel**
   ```bash
   npx vercel
   ```

## Base Pay Integration

The app uses Base Pay for USDC payments:

- **Real Integration**: Uses `@base-org/account` SDK when available
- **Fallback**: Simulates payments for demo purposes
- **Testnet Support**: Automatically uses testnet in development

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page
│   └── globals.css         # Global styles
├── components/
│   └── BasePayButton.tsx   # Payment component
├── package.json            # Dependencies
├── vercel.json            # Vercel config
└── README.md              # This file
```

## License

MIT
# Lost
