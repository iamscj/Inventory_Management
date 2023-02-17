import axios from "axios"; 

async function getData() {
    let quantities = (await axios.get(`http://localhost:4000/get-cart?customerID=${localStorage.getItem('user-id')}`)).data;

    let data = {
        productItems: [
            {
                id: 1,
                name: "Panel 1",
                cost: 11989,
                contents: <><t>4 <b className="bb"> PM   .</b></t>  <t> 8 <b className="bb"> CAP   .</b></t> <t> 3 <b className="bb"> TC   </b></t></>,
                quantity : quantities['panel1']
            },
            {
                id: 2,
                name: "Panel 2",
                cost: 23123,
                contents: "8 PM + 1 CAP + 3 TC",
                quantity : quantities['panel2']
            },
            {
                id: 3,
                name: "Panel 3",
                cost: 1313,
                contents: "4 PM + 8 AUX + 3 TC",
                quantity : quantities['panel3']
            },
            {
                id: 4,
                name: "Panel 4",
                cost: 112312,
                contents: "4 PM + 1 CAP + 3 VCU",
                quantity : quantities['panel4']
            },
            {
                id: 5,
                name: "Panel 5",
                cost: 1112,
                contents: "1 CAP + 1 TC + 1 AUX",
                quantity : quantities['panel5']
            },
        ]
    }
    return data;
}



export default getData;