import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { load } from "../../store/isLoaded"
import "./SignupFormPage.css"
import FormFields from './FormFields'

function SignupFormPage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState([])

    useEffect(() => {
        dispatch(load())
    }, [dispatch, history])

    return (
        <div className="container">
            <div className="form-outer">
                <div className="form-inner">
                    <div>
                        <ul>
                            {errors.map(error => <li key={error}>{error}</li>)}
                        </ul>
                    </div>
                    <FormFields setErrors={setErrors} />
                </div>
            </div>
            <div className="info-text">
                <div className="text-box 1">
                    <h3>Commission-free stock trading</h3>
                    <p>
                        We’ve cut the fat that makes other brokerages costly, by not functioning as an actual stock trading website. It may look legit, but take my word, it's not.
                    </p>
                </div>
                <div className="text-box 2">
                    <h3>Account Protection</h3>
                    <p>
                        Stormlight Financial is not a member of SIPC. There are no securities in your account, and no $500,000 protection.
                    </p>
                </div>
                <div className="text-box 3">
                    <h3>Keep tabs on your money</h3>
                    <p>
                        If you want to know more than a basic snapshot of how well a few stocks are performing, this isn't your app. But if that's your game, we're in!
                    </p>
                </div>
            </div>
        </div >
    )
}

export default SignupFormPage
