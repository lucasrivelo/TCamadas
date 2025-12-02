
import express from 'express'
import { PrismaAppointmentRepository } from '../src/infrastructure/PrismaRepo.js'
import { SchedulerService } from '../src/application/SchedulerService.js'

function padraoUTC(dateStr: string, timeStr: string): Date {
    
    const [day, month, year] = dateStr.split('/').map(Number);
    const [hour, minute] = timeStr.split(':').map(Number);

    const date = new Date(Date.UTC(year, month - 1, day, hour, minute)); 
    
    return date; 
}

const app = express()
const port = 3000
const prismaApRepo = new PrismaAppointmentRepository()
const schedulerService = new SchedulerService(prismaApRepo)

app.use(express.json())

app.post('/compromissos', async (req, res) => {
  const { data, hora_inicio, hora_fim, descricao } = req.body

  if (!data || !hora_inicio || !hora_fim || !descricao) {
    return res.status(400).json({ error: "Parâmetros inválidos." })
  }

  try {
    const start = padraoUTC(data, hora_inicio)
    const end = padraoUTC(data, hora_fim)

    const resultado = await schedulerService.adicionarCompromisso({
      start_datetime: start,
      end_datetime: end,
      description: descricao
    })

    res.status(201).json(resultado)

  } catch (error: any) {
    res.status(400).json({ error: error?.message })
  }
})

app.get('/compromissos', async (req, res) => {
  const compromissos = await schedulerService.listarCompromissos()
  res.json(compromissos)
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})