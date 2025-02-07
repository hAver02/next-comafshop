

import ProductsTable from '@/components/email-template';
import prisma from '@/lib/db';
import { Resend } from 'resend';

const resend = new Resend('re_KwCcbqn6_NM5XvNZjU4zr1nJ9GRuhzpNS');

export async function POST(req: Request) {
  try {
    const { totalAmount, budgetProducts, user } = await req.json();
    if(!totalAmount || !budgetProducts || !user ) throw new Error('Invdalid data sent');

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['pazluciano.dev@gmail.com'],
      subject: 'Resumen de tu presupuesto',
      react: ProductsTable({totalAmount, budgetProducts}),
    });

    if (error) {
      return Response.json({ ok : false, error }, { status: 500 });
    }
    return Response.json({ok : true, message : 'Email sent' });
  } catch (error) {
    return Response.json({ ok : false, error }, { status: 500 });
  }
}
