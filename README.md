# Personal Website

A modern personal website built with [Next.js](https://nextjs.org), featuring an interactive AI chat interface.

## Features

- 🚀 Next.js for performance and SEO
- 📱 Responsive design
- 🎨 Clean UI
- ⚡ Fast page loads
- 💬 AI Chat Interface with:
  - Interactive suggestions
  - Side actions (theme toggle, resume download)
  - Section navigation
  - Responsive positioning
  - Smart context handling

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm, yarn, or pnpm
- OpenAI API Key (for chat functionality)

### Installation

1. Clone and install:
```bash
git clone https://github.com/yourusername/israteneda.com.git
cd israteneda.com
pnpm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
# Add your OpenAI API key to .env.local
```

3. Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Development

- `pnpm dev` - Development server
- `pnpm build` - Production build
- `pnpm start` - Production server

## Chat Interface

The website features an AI-powered chat interface that helps visitors navigate and learn about my work. Key components:

### Components
- `ChatInterface.tsx`: Main chat component
- `lib/chat-config.ts`: Chat configuration and suggestions
- `lib/chat-events.ts`: Event handling
- `lib/openai.ts`: OpenAI integration

### Side Actions
The chat supports special actions that can be executed without generating chat messages:
- Theme toggling
- Resume download
- Section navigation

**Note**: When adding new side actions, make sure to update the OpenAI system rules in `lib/openai.ts` to handle them appropriately.

## Tech Stack

- [Next.js](https://nextjs.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com)
- [OpenAI API](https://openai.com)
- [shadcn/ui](https://ui.shadcn.com/)

## Contact

Isra Teneda - [@israteneda](https://twitter.com/israteneda)
