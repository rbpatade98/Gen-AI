const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cookieParser())

// ──── CORS ─────────────────────────────────────────────────────────────────────
const allowedOrigins = [
    process.env.FRONTEND_URL,
    "http://localhost:5173",
    "http://localhost:5174",
    "https://interview-ai-yt.vercel.app",
    "https://664330798d647515a319cd8e--vibrant-truffle-6fc04c.netlify.app",
]

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error(`🚫 CORS blocked for: ${origin}`))  // ✅ clear error message
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Content-Length"]
}))

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


/* using all the routes here */
app.get("/", (req, res) => {
    res.json({ message: "Server is running! ", status: "Healthy" })
})
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)



module.exports = app