
export default {
    backendURL: process.env.NODE_ENV === "production" ? "https://hsuweb.kemri-wellcome.org/verify" : "http://localhost:8001"
}
