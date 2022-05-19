const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = class ProductCtrl {
    async all_products() {
        const result = await prisma.product.findMany({
            include: { seller: true }
        });
        return result;
    }

    async add_product(data) {
        try {
            const result2 = await prisma.product.findUnique({
                where: { name: data.name }
            })
            if (result2==null) {
                const result = await prisma.product.create({
                    data
                })
                return result;
            }
            return 'The similar Product already exists!!'
        } catch (err) {
            return err.message;
        }
    }

    async update_product(id, data) {
        try {
            const result2 = await prisma.product.findUnique({
                where: { id }
            })
            if (result2) {
                await prisma.product.update({
                    where: { id },
                    data
                })
                return 'The product updated.';
            }
            return "The product does not exists!!"
        } catch (err) {
            return err.message;
        }
    }

    async delete_product(id) {
        try {
            const result2 = await prisma.product.findUnique({
                where: { id }
            })
            if (result2) {
                await prisma.product.delete({
                    where: { id }
                })
                return 'The product deleted.';
            }
            return "The product does not exists!!"
        } catch (err) {
            return err.message;
        }
    }
}