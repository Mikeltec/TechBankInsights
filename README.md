# Tech Bank Insights

This is a financial portfolio dashboard that provides AI-powered insights into investment performance. It features an interactive chart to visualize portfolio history, a breakdown of asset allocation, and key performance metrics.

Built with [Next.js](https://nextjs.org/) and styled with [Tailwind CSS](https://tailwindcss.com/) and [ShadCN UI](https://ui.shadcn.com/). The AI features are powered by Google's Gemini models through [Genkit](https://firebase.google.com/docs/genkit).

## Features

- **Interactive Dashboard:** Visualize your portfolio's performance over different time periods.
- **AI-Powered Insights:** Get intelligent summaries and analyses of your portfolio's trends.
- **Asset Allocation:** See a clear breakdown of your investment distribution.
- **Key Metrics:** Track total value, gains, and performance changes at a glance.
- **Custom Date Range:** Filter your portfolio view by selecting a custom date range.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) or a compatible package manager

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <your-repository-name>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of your project and add your Google AI API key:
    ```
    GEMINI_API_KEY="your-api-key-here"
    ```
    You can obtain an API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

    Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (with App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
- **AI/Generative:** [Genkit](https://firebase.google.com/docs/genkit) with Google Gemini
- **Language:** [TypeScript](https://www.typescriptlang.org/)
