const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

module.exports = class UsersCtrl {
    async all_users() {
        try {
            const result = await prisma.seller.findMany({
                include: { products: true }
            });
            return result;
        } catch (err) {
            return err.message;
        }
    }

    async new_user(data) {
        try {
            data['password'] = await bcrypt.hash(data.password, 10);
            console.log(data.email);
            const result2 = await prisma.seller.findUnique({
                where: { email: data.email }
            })
            if (!result2) {
                const result = await prisma.seller.create({
                    data
                })
                return result;
            }
            return 'The similar user already exists!!'
        } catch (err) {
            return err.message;

        }
    }

    async find_user(data) {
        try {
            const password = data.password;
            delete data.password;
            data = (data.email && data.phone_number)? {email: data.email}: data;
            const result = await prisma.seller.findUnique({
                where: data
            })
            if (result) {
                const secondLevel = await bcrypt.compare(password, result.password)
                return secondLevel? result: "Something is Invalid!!" 
            }
            return "The user doesn't exists!!"
        } catch (err) {
            return err.message;
        }
    }

    async update_user(id, data) {
        try {
            if (data.hasOwnProperty('email') && data.hasOwnProperty('phone_number')) {
                const result3 = await prisma.seller.findUnique({
                    where: {email: id.email}
                })
                if (result3 && result3.phone_number==id.phone_number) {
                    data['password'] = await bcrypt.hash(data.password, 10);
                    const result = await prisma.seller.update({
                        where: {phone_number: id.phone_number},
                        data
                    })
                    return result;
                }
                return 'Invalid phone_number or email!!'
            }
            const result2 = await prisma.seller.update({
                where: id,
                data
            })
            return result2;
        } catch (err) {
            return err.message;
        }
    }

    async delete_user(id) {
        try {
            const result = await prisma.seller.delete({
                where: { id }
            });
            return result;
        } catch (err) {
            return err.message;
        }
    }
}