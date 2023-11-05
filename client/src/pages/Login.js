
const Login = (props) => {
    const AUTH_URL = `${props.api_url}/auth/github`

    return (
        <div className="login">
            <h1>On the fly wee</h1>
            <center>
                <a href={AUTH_URL}>
                    <button className="headerBtn">Login Via Github</button>
                </a>
            </center>
        </div>
    )
}
export default Login