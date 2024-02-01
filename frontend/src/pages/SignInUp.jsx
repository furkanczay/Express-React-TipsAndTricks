export default function SignInUp() {

    return ( 
        <>
            <form>
                <h1>Sign In</h1>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" />
                <br />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" />
                <br />
                <button type="submit">Sign In</button>
            </form>
            <br />
            <form>
                <h1>Sign Up</h1>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" />
                <br />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" />
                <br />
                <button type="submit">Sign Up</button>
            </form>
        </>
    )
}