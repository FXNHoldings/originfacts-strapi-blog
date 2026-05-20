export const TPWL_HOST = 'https://flights.originfacts.com';

const pad = (n: number) => String(n).padStart(2, '0');
const ymd = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export function tpwlSearchUrl(origin: string, destination: string): string {
  const depart = new Date();
  depart.setHours(0, 0, 0, 0);
  depart.setDate(depart.getDate() + 30);
  const ret = new Date(depart);
  ret.setDate(depart.getDate() + 7);
  const params = new URLSearchParams({
    origin_iata: origin,
    destination_iata: destination,
    depart_date: ymd(depart),
    return_date: ymd(ret),
    adults: '1',
    trip_class: 'Y',
    with_request: 'true',
  });
  return `${TPWL_HOST}/?${params.toString()}`;
}
