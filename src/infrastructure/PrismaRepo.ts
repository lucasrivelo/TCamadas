import { prisma } from '../../lib/prisma';
import { Appointment, IAppointmentRepository } from '../domain/AppointmentRepo';

export class PrismaAppointmentRepository implements IAppointmentRepository {
    private mapPrisma(prismaAppointment: any): Appointment {
        return {
            id: prismaAppointment.id,
            start_datetime: prismaAppointment.start_datetime,
            end_datetime: prismaAppointment.end_datetime,
            description: prismaAppointment.description,
        };
    }

    async listar(): Promise<Appointment[]> {
        const appointments = await prisma.appointments.findMany();
        return appointments.map(this.mapPrisma);
    }

    async salvar(appointment: Appointment): Promise<Appointment> {
        const newAppointment = await prisma.appointments.create({
            data: {
                start_datetime: appointment.start_datetime,
                end_datetime: appointment.end_datetime,
                description: appointment.description,
            },
        });
        return this.mapPrisma(newAppointment);
    }

    async busca(start: Date, end: Date): Promise<Appointment[]> {
        
        const overlapping = await prisma.appointments.findMany({
            where: {
                end_datetime: {
                    gt: start,
                },

                start_datetime: {
                    lt: end,
                },
            },
        });

        return overlapping.map(this.mapPrisma);
    }
}