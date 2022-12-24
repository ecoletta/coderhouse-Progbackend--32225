import { Router } from "express";

const router = Router()
const carts = []

router.get('/', (req, res) =>{
    res.status(200).send("Estoy en /api/carts")
})

router.get('*',(req, res) => {
    res.status(404).send("Recurso no encontrado en /api/carts/*")
})

export default router