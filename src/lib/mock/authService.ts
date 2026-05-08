type MockUser = {
    id: string;
    name: string;
    email: string;
    password: string;
  };
  
  type PublicUser = Omit<MockUser, "password">;
  
  type AuthResult = {
    token: string;
    user: PublicUser;
  };
  
  const USERS_KEY = "admin-users";
  const OTP_KEY = "admin-reset-otp";
  const RESET_ALLOWED_KEY = "admin-reset-allowed";
  
  const sleep = (ms = 500) => new Promise((r) => setTimeout(r, ms));
  
  function readUsers(): MockUser[] {
    if (typeof window === "undefined") return [];
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as MockUser[]) : [];
  }
  
  function writeUsers(users: MockUser[]) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
  
  function toPublicUser(user: MockUser): PublicUser {
    return { id: user.id, name: user.name, email: user.email };
  }
  
  function createToken(userId: string) {
    return `mock-token-${userId}-${Date.now()}`;
  }
  
  export async function signup(params: {
    name: string;
    email: string;
    password: string;
  }): Promise<void> {
    await sleep();
    const users = readUsers();
    const exists = users.some(
      (u) => u.email.toLowerCase() === params.email.toLowerCase()
    );
    if (exists) throw new Error("Email already registered");
  
    const newUser: MockUser = {
      id: crypto.randomUUID(),
      name: params.name.trim(),
      email: params.email.trim().toLowerCase(),
      password: params.password,
    };
  
    users.push(newUser);
    writeUsers(users);
  }
  
  export async function login(params: {
    email: string;
    password: string;
  }): Promise<AuthResult> {
    await sleep();
    const users = readUsers();
    const user = users.find(
      (u) =>
        u.email.toLowerCase() === params.email.toLowerCase() &&
        u.password === params.password
    );
    if (!user) throw new Error("Invalid email or password");
  
    return { token: createToken(user.id), user: toPublicUser(user) };
  }
  
  export async function requestPasswordReset(email: string): Promise<void> {
    await sleep();
    const users = readUsers();
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) throw new Error("Email not found");
  
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    sessionStorage.setItem(OTP_KEY, JSON.stringify({ email: user.email, otp }));
    sessionStorage.removeItem(RESET_ALLOWED_KEY);
  
    // For demo only: show OTP in console
    console.log("Mock OTP:", otp);
  }
  
  export async function verifyOtp(params: {
    email: string;
    otp: string;
  }): Promise<void> {
    await sleep();
    const raw = sessionStorage.getItem(OTP_KEY);
    if (!raw) throw new Error("OTP expired. Please request again.");
  
    const saved = JSON.parse(raw) as { email: string; otp: string };
    if (
      saved.email.toLowerCase() !== params.email.toLowerCase() ||
      saved.otp !== params.otp
    ) {
      throw new Error("Invalid OTP");
    }
  
    sessionStorage.setItem(
      RESET_ALLOWED_KEY,
      JSON.stringify({ email: saved.email, allowed: true })
    );
  }
  
  export async function resetPassword(params: {
    email: string;
    newPassword: string;
  }): Promise<void> {
    await sleep();
    const raw = sessionStorage.getItem(RESET_ALLOWED_KEY);
    if (!raw) throw new Error("Reset not allowed. Verify OTP first.");
  
    const permission = JSON.parse(raw) as { email: string; allowed: boolean };
    if (
      !permission.allowed ||
      permission.email.toLowerCase() !== params.email.toLowerCase()
    ) {
      throw new Error("Reset not allowed for this email.");
    }
  
    const users = readUsers();
    const index = users.findIndex(
      (u) => u.email.toLowerCase() === params.email.toLowerCase()
    );
    if (index === -1) throw new Error("User not found");
  
    users[index].password = params.newPassword;
    writeUsers(users);
  
    sessionStorage.removeItem(OTP_KEY);
    sessionStorage.removeItem(RESET_ALLOWED_KEY);
  }