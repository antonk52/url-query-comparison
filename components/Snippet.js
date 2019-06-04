export default ({children}) => (
    <div>
        {children}
        <style jsx>{`
            div {
                display: block;
                max-width: 100%;
                flex-grow: 1;
                flex-shrink: 0;
                padding: 10px 30px;
            
                background: #fff;
                box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.12);
                border-radius: 5px;
            
                -webkit-transition: all 0.2s ease;
                transition: all 0.2s ease;
                overflow: hidden;
            }
            
            div + div {
                margin-top: 24px;
            }

            @media screen and (max-width: 599px) {
                div {
                    padding-left: 4px;
                    padding-right: 4px;
            
                    flex-shrink: 1;
                    box-shadow: none;
                }
            
                div + div {
                    margin-top: 4px;
                }
            }
        `}
        </style>
    </div>
);
