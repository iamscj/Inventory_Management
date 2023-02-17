import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import bcrypt from "bcryptjs"
function Protected2(props) {
    const { Component } = props;
    const navigate = useNavigate();
    useEffect(() => {
        let login = localStorage.getItem('login');
        let key = localStorage.getItem('key');
        let key1 = localStorage.getItem('key1');
        console.log("hi" + key)

        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/test?email=${key}`);
                console.log(res)
                const previlige = res.data.previlige
                const password = res.data.password
                console.log("Password is " + password)
                console.log("Key1 " + key1)
                const isPasswordCorrect = bcrypt.compareSync(key1, res.data.password);
                if (isPasswordCorrect === false) {
                    navigate('/login')
                }
                return 1;
            } catch (err) {
                console.log(err);
                return 0;
            }
        };
        console.log(fetchData());
        if (login !== "admin" && fetchData()) {
            navigate('/login')
        }
    });


    return (
        <div>
            <Component />
        </div>
    )
}

export default Protected2;