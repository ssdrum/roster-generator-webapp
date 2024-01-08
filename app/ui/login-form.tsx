export default function LoginForm() {
  return (
    <>
      <h1>Login Form Page</h1>
      <form>
        <input
          id='email'
          type='email'
          name='email'
          placeholder='Enter your email address'
          required
        />
        <input
          id='password'
          type='password'
          name='password'
          placeholder='Enter password'
          required
          minLength={6}
        />
        <button>Submit</button>
      </form>
    </>
  );
}
