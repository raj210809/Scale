import express,{Request , Response} from "express";
import Address from "../models/address.models";

export const addAddress = async (req : Request , res : Response) => {
    try {
        const { name,user, mobile, pincode, address, locality, city, state, address_type } = req.body;

        const newaddress = new Address({
            user,
            name,
            mobile,
            pincode,
            address,
            locality,
            city,
            state,
            address_type
        });

        await newaddress.save();

        res.status(200).json({ message: "Address added successfully" });
    } catch (error) {
        console.log(error);
    }
}

export const getAddresses = async (req : Request , res : Response) : Promise<any> => {
    const { user } = req.query;
    try {
        const addresses = await Address.find({user : user});
        res.status(200).json({ addresses });
    } catch (error) {
        console.log(error);
    }
}