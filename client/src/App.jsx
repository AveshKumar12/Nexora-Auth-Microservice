
import { useEffect,useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  ArrowRight,
  Eye,
  EyeOff,
  Mail,
  LockKeyhole,
  UserRound,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const API = "http://localhost:5000/api/auth";

export default function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
const [checkingAuth, setCheckingAuth] = useState(true);

useEffect(() => {
  const loadUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setCheckingAuth(false);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        localStorage.removeItem("token");
        return;
      }

      setCurrentUser(data.user);
    } catch (error) {
      console.error("Unable to load user:", error);
    } finally {
      setCheckingAuth(false);
    }
  };

  loadUser();
}, []);

  const switchMode = (login) => {
    setIsLogin(login);
    setMessage("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `${API}/${isLogin ? "login" : "register"}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            isLogin ? { email, password } : { name, email, password }
          ),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const validationErrors = data.errors
          ?.map((item) => item.message)
          .join(", ");

        throw new Error(
          validationErrors || data.message || "Request failed."
        );
      }

     if (isLogin && data.token) {
  localStorage.setItem("token", data.token);

  if (data.user) {
    setCurrentUser(data.user);
  } else {
    throw new Error("Login successful, but user details were not returned.");
  }

  setMessageType("success");
  setMessage(`Welcome back, ${data.user.name || "you"}!`);
} else {
  setMessageType("success");
  setMessage("Account created successfully. You can now sign in.");

  setIsLogin(true);
  setPassword("");
}
    } catch (error) {
      setMessageType("error");
      setMessage(
        error instanceof TypeError
          ? "Cannot reach the server. Check that your backend is running."
          : error.message
      );
    } finally {
      setLoading(false);
    }
  };



  if (checkingAuth) {
  return (
    <main className="nexora-shell">
      <div className="form-panel">
        <p>Verifying your secure session...</p>
      </div>
    </main>
  );
}

if (currentUser) {
  const userRole = currentUser.role || "user";

  return (
    <main className="nexora-shell">
      <nav className="topbar">
        <a href="#" className="brand">
          <span className="brand-mark">
            <ShieldCheck size={23} />
          </span>
          <span>NEXORA<span className="brand-dot">.</span></span>
        </a>

        <button
          type="button"
          className="submit-btn"
          onClick={() => {
            localStorage.removeItem("token");
            setCurrentUser(null);
            setMessage("");
            setIsLogin(true);
            setPassword("");
          }}
        >
          Logout
        </button>
      </nav>

      <section className="auth-layout">
        <motion.div
          className="form-panel"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="mini-label">YOUR WORKSPACE</span>

          <h1>Welcome, {currentUser.name || "User"}!</h1>

          <p className="intro-copy">
            You are successfully authenticated with Nexora.
          </p>

          <div className="feature-list">
            <div className="feature-item">
              <UserRound size={18} />
              <span>Name: {currentUser.name || "Not available"}</span>
            </div>

            <div className="feature-item">
              <Mail size={18} />
              <span>Email: {currentUser.email || "Not available"}</span>
            </div>

            <div className="feature-item">
              <ShieldCheck size={18} />
              <span>Role: {userRole}</span>
            </div>
          </div>

          {userRole === "admin" && (
            <div className="feedback success">
              Admin access enabled for this account.
            </div>
          )}

          {userRole !== "admin" && (
            <div className="feedback success">
              Your standard user workspace is active.
            </div>
          )}
        </motion.div>
      </section>

      <footer className="page-footer">
        <span>© 2026 Nexora</span>
        <span>SECURE BY DESIGN</span>
      </footer>
    </main>
  );
}
  return (
    <main className="nexora-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="ambient ambient-three" />

      <nav className="topbar">
        <a href="#" className="brand">
          <span className="brand-mark">
            <ShieldCheck size={23} strokeWidth={2.1} />
          </span>
          <span>NEXORA<span className="brand-dot">.</span></span>
        </a>
        <div className="secure-label">
          <span className="status-dot" />
          SECURE ACCESS
        </div>
      </nav>

      <section className="auth-layout">
        <motion.div
          className="intro-panel"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="eyebrow">
            <Sparkles size={15} />
            YOUR DIGITAL SPACE
          </div>

          <h1>
            Everything starts
            <br />
            with <span>access.</span>
          </h1>

          <p className="intro-copy">
            A smarter way to manage your account, protect your identity,
            and stay in control of your workspace.
          </p>

          <div className="feature-list">
            {[
              "Secure account authentication",
              "Protected personal workspace",
              "Role-based access control",
            ].map((item, index) => (
              <motion.div
                className="feature-item"
                key={item}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.12 }}
              >
                <CheckCircle2 size={18} />
                <span>{item}</span>
              </motion.div>
            ))}
          </div>

          <div className="orbital-art" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit orbit-three" />
            <div className="orbit-core">
              <ShieldCheck size={42} />
            </div>
            <span className="orbit-star star-one">✦</span>
            <span className="orbit-star star-two">✧</span>
          </div>

          <p className="left-footer">DESIGNED FOR WHAT'S NEXT.</p>
        </motion.div>

        <motion.div
          className="form-panel"
          initial={{ opacity: 0, y: 18, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.1 }}
        >
          <div className="form-heading">
            <span className="mini-label">
              {isLogin ? "YOUR ACCOUNT" : "GET STARTED"}
            </span>
            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? "login-title" : "register-title"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                <h2>{isLogin ? "Welcome back" : "Create your account"}</h2>
                <p>
                  {isLogin
                    ? "Enter your details to continue."
                    : "A few details and you're ready to go."}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mode-switch">
            <button
              type="button"
              className={isLogin ? "mode-active" : ""}
              onClick={() => switchMode(true)}
            >
              Sign in
            </button>
            <button
              type="button"
              className={!isLogin ? "mode-active" : ""}
              onClick={() => switchMode(false)}
            >
              Create account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <AnimatePresence initial={false}>
              {!isLogin && (
                <motion.div
                  className="field-wrap"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label htmlFor="name">Full name</label>
                  <div className="input-wrap">
                    <UserRound size={18} />
                    <input
                      id="name"
                      type="text"
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      minLength={2}
                      maxLength={50}
                      autoComplete="name"
                      required={!isLogin}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="field-wrap">
              <label htmlFor="email">Email address</label>
              <div className="input-wrap">
                <Mail size={18} />
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="field-wrap">
              <label htmlFor="password">Password</label>
              <div className="input-wrap">
                <LockKeyhole size={18} />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimum 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  required
                />
                <button
                  className="password-toggle"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {message && (
                <motion.div
                  role="status"
                  className={`feedback ${messageType}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {message}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              className="submit-btn"
              disabled={loading}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
            >
              <span>
                {loading
                  ? "Please wait..."
                  : isLogin
                    ? "Sign in to Nexora"
                    : "Create account"}
              </span>
              {!loading && <ArrowRight size={19} />}
            </motion.button>
          </form>

          <div className="form-bottom">
            <span className="bottom-shield"><ShieldCheck size={16} /></span>
            <span>Your account is protected by secure authentication.</span>
          </div>
        </motion.div>
      </section>

      <footer className="page-footer">
        <span>© 2026 Nexora</span>
        <span>SECURE BY DESIGN <span className="footer-separator">·</span> BUILT FOR YOU</span>
      </footer>
    </main>
  );
}
