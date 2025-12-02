import { SchedulerService } from './application/SchedulerService';
import { PrismaAppointmentRepository } from './infrastructure/PrismaRepo';
import { Appointment } from './domain/AppointmentRepo';

function padraoUTC(dateStr: string, timeStr: string): Date {
    
    const [day, month, year] = dateStr.split('/').map(Number);
    const [hour, minute] = timeStr.split(':').map(Number);

    const date = new Date(Date.UTC(year, month - 1, day, hour, minute)); 
    
    if (isNaN(date.getTime())) {
        throw new Error('Formato de data ou hora inválido.');
    }
    
    return date; 
}

const appointmentRepository = new PrismaAppointmentRepository();

const schedulerService = new SchedulerService(appointmentRepository);


async function adicionarCompromisso(args: string[]) {
    const [date, start, end, description] = args;

    if (!date || !start || !end || !description) {
        throw new Error('Uso: adicionar_compromisso "dd/mm/aaaa" "hh:mm" "hh:mm" "Descrição"');
    }
        
    try {
        const startUtc = padraoUTC(date, start);
        const endUtc = padraoUTC(date, end);

        const newAppointment: Appointment = {
            start_datetime: startUtc, 
            end_datetime: endUtc, 
            description 
        };

        const result = await schedulerService.adicionarCompromisso(newAppointment);

        console.log(`\n Compromisso agendado com sucesso!`);
        console.log(`ID: ${result.id} | Data: ${startUtc.toLocaleDateString()} | Início: ${startUtc.toLocaleTimeString()} | Descrição: ${result.description}`);

    } catch (error) {
        console.log(`Erro ao agendar`);
    }
}


async function listarCompromissos() {
    try {
        const appointments = await schedulerService.listarCompromissos();
        
        console.log('\n--- Compromissos Agendados ---');
        if (appointments.length === 0) {
            console.log('Nenhum compromisso encontrado.');
            return;
        }

        appointments.forEach(a => {
            console.log(`ID: ${a.id} | De: ${a.start_datetime.toLocaleString('pt-BR')} até: ${a.end_datetime.toLocaleString('pt-BR')} | Descrição: ${a.description}`);
        });
        console.log('------------------------------\n');

    } catch (error) {
        console.log(`\nErro ao listar`);
    }
}

async function run() {
    const args = process.argv.slice(2);
    const command = args[0];

    if (command === 'listar_compromissos') {
        await listarCompromissos();
    } else if (command === 'adicionar_compromisso') {
        await adicionarCompromisso(args.slice(1));
    } else {
        console.log('Comando desconhecido. Use: listar_compromissos ou adicionar_compromisso.');
    }
}

run().catch((e) => {
    process.exit(1);
});