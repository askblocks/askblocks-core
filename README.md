# Askblocks Core

This repository contains the core engine powering the Askblocks AI Q&A widget. It is a serverless Cloudflare Worker API that takes a prompt and returns a concise answer using a selected AI model.

## 🔧 API Endpoints

| Method | Endpoint   | Description                  | Body (JSON)                      | Response (JSON)                          |
|--------|------------|------------------------------|----------------------------------|------------------------------------------|
| POST   | `/ask`     | Sends a prompt to the AI     | `{ "prompt": "your question" }` | `{ "answer": "AI-generated response" }`  |
| GET    | `/health`  | Health check endpoint        | –                                | `OK` (plain text)                        |

## 🌐 Live API (for reference only)
A demo deployment of this API is available at:
```
https://api.askblocks.ai
```
To check if it’s running, call the health endpoint:
```
GET https://api.askblocks.ai/health
```
Expected response:
```
{ "status": "ok" }
```
🛠️ Note: Only maintainers can deploy to this production endpoint. Contributors don’t need to deploy—just fork, develop, and test locally.


## 🤝 Contributing

We welcome contributions! Follow these steps to contribute to the Askblocks Core API project:

### 🔄 1. Fork and Clone

Fork the repository on GitHub, then clone it to your local machine:

```bash
git clone https://github.com/YOUR_USERNAME/askblocks-core.git
cd askblocks-core
```
### 🛠 2. Install Dependencies

Use npm ci to install exact versions from package-lock.json:
```
npm ci
```

### 🔧 3. Set Up Environment

This project uses the [Groq API](https://groq.com/) to power the `/ask` endpoint via Meta's [`llama3`](https://ai.meta.com/blog/meta-llama-3/) model.

#### 🗝️ Get an API Key

1. Visit [https://console.groq.com/keys](https://console.groq.com/keys) (sign in with Google or GitHub).
2. Click **"Generate API Key"** and copy the token.

#### 🔐 Add the API Key

You can either add the token directly in your `wrangler.jsonc` file:

```jsonc
{
  "vars": {
    "GROQ_API_KEY": "your-groq-api-key-here"
  }
}
```
Or store it securely using Wrangler secrets:
```
npx wrangler secret put GROQ_API_KEY
```
This ensures your API key is not exposed in version control.

### 🚀 4. Run Locally
To start the local development server on port 8000:
```
npm run dev
```
You can now test your changes via:
- `POST http://localhost:8000/ask`
- `GET http://localhost:8000/health`

### ✅ 5. Run Tests
Make sure all tests pass before committing:
```
npm run test
```
This will lint your code and run unit tests (Jest).

### 🔁 6. Sync with Upstream
Before creating a pull request, ensure your fork is up to date:
```
npm run sync
```

### 📝 7. Create a Pull Request

Once you're happy with your changes:

1. Push to your fork’s `main` branch
2. Open a Pull Request to `askblocks/askblocks-core` via GitHub UI
3. Make sure the CI passes and follow the PR template

## 👏 Thanks for reading and contributing. Let’s build something amazing.