import { X, User, AtSign } from "lucide-react"
import { FormEvent } from "react"
import { Button } from "../../components/button"
import { DateRange } from "react-day-picker"
import { format } from "date-fns"

interface ConfirmTripModalProps {
  closeConfirmTripModal: () => void
  createTrip: (event: FormEvent<HTMLFormElement>) => void
  destination: string
  eventStartAndEndDates: DateRange | undefined
  setOwnerName: (name: string) => void
  setOwnerEmail: (email: string) => void
}

export const ConfirmTripModal = ({
  closeConfirmTripModal,
  createTrip,
  destination,
  eventStartAndEndDates,
  setOwnerName,
  setOwnerEmail
}: ConfirmTripModalProps) => {
  const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to ? format(eventStartAndEndDates.from, "d' de 'LLL").concat(" até ").concat(format(eventStartAndEndDates.to, "d' de 'LLL")) : null

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Confirmar criação de viagem</h2>
            <button onClick={closeConfirmTripModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Para concluir a criação da viagem <span className="text-zinc-100 font-semibold">para {destination}</span> nas datas de <span className="text-zinc-100 font-semibold">
              {displayedDate ?? 'não definida'}
            </span> preencha seus dados abaixo:
          </p>
        </div>

        <form className="space-y-3" onSubmit={createTrip}>
          <div className="px-4 h-14 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="text-zinc-400 size-5" />
            <input
              type="text"
              placeholder="Seu nome completo"
              name="name"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none"
              onChange={event => setOwnerName(event.target.value)}
            />
          </div>

          <div className="px-4 h-14 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <AtSign className="text-zinc-400 size-5" />
            <input
              type="email"
              placeholder="Seu e-mail pessoal"
              name="email"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none"
              onChange={event => setOwnerEmail(event.target.value)}
            />
          </div>

          <Button type="submit" variant="primary" size="full">
            Confirmar criação da viagem
          </Button>
        </form>
      </div>
    </div>
  )
}