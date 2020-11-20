import React, { useState } from 'react'
import "./SignupFormPage.css"
import FormFields from './FormFields'

function SignupFormPage() {
    const [errors, setErrors] = useState([])
    return (
        <div className="container">
            <div className="form-outer">
                <div className="form-inner">
                    <div>
                        <ul>
                            {errors.map(error => <li key={error}>{error}</li>)}
                        </ul>
                    </div>
                    <FormFields errors={errors} setErrors={setErrors} />
                </div>
            </div>
            <div className="info-text">
                <div className="text-box 1">
                    <h3>Commission-free stock trading</h3>
                    <p>
                        We’ve cut the fat that makes other brokerages costly, like manual account management and hundreds of storefront locations, so we can offer zero commission trading.
                    </p>
                </div>
                <div className="text-box 2">
                    <h3>Account Protection</h3>
                    <p>
                        Robinhood Financial is a member of SIPC. Securities in your account are protected up to $500,000. For details, please see www.sipc.org.
                    </p>
                </div>
                <div className="text-box 3">
                    <h3>Keep tabs on your money</h3>
                    <p>
                        Set up customized news and notifications to stay on top of your assets as casually or as relentlessly as you like. Controlling the flow of info is up to you.
                    </p>
                </div>
            </div>
        </div >
    )
}

export default SignupFormPage
