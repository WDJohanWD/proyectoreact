const Error404 = () => {
    return (
        <div id='oopss'>
            <div id='error-text'>
                <img src="https://cdn.rawgit.com/ahmedhosna95/upload/1731955f/sad404.svg" alt="404"/>
                    <span> That page isn&apos;t available</span>
                    <p className="p-a">We are very sorry, please try going back home</p>
                    {/* <p className="p-b">We sorry,  </p> */}
                    <a href='/' className="back">Go home</a>
            </div>
        </div>
    );
};

export default Error404;