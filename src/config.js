
export default {
    backendURL: process.env.NODE_ENV === "production" ? "/verify" : "http://localhost:8000"
}
