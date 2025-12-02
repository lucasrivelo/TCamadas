export interface Appointment {
    id?: number;
    start_datetime: Date;
    end_datetime: Date;
    description: string;
}

export interface IAppointmentRepository {
    listar(): Promise<Appointment[]>;
    salvar(appointment: Appointment): Promise<Appointment>;
    busca(start: Date, end: Date): Promise<Appointment[]>;
}