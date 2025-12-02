import { Appointment, IAppointmentRepository } from '../domain/AppointmentRepo';

export class SchedulerService {
    constructor(private Repository: IAppointmentRepository) {}

    async listarCompromissos(): Promise<Appointment[]> {
        return this.Repository.listar();
    }

    async adicionarCompromisso(newAppointment: Appointment): Promise<Appointment> {
        if (newAppointment.start_datetime >= newAppointment.end_datetime) {
            throw new Error('A hora de início deve ser anterior à hora de fim.');
        }

        const buscarAppointments = await this.Repository.busca(
            newAppointment.start_datetime,
            newAppointment.end_datetime
        );

        if (buscarAppointments.length > 0) {
            throw new Error('Horário já reservado para a data selecionada. Escolha outro período.');
        }

        return this.Repository.salvar(newAppointment);
    }
}