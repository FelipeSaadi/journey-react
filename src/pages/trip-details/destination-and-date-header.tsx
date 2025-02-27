import { MapPin, Calendar, Settings2 } from "lucide-react"
import { Button } from "../../components/button"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { api } from "../../lib/axios"
import { format } from "date-fns"

interface Trip {
  destination: string
  starts_at: string
  ends_at: string
  id: string
  is_confirmed: boolean
}

export const DestinationAndDateHeader = () => {
  const { tripId } = useParams()
  const [trip, setTrip] = useState<Trip | undefined>()

  const displayedDate = trip ? format(trip.starts_at, "d' de 'LLL").concat(" até ").concat(format(trip.ends_at, "d' de 'LLL")) : null

  useEffect(() => {
    api.get(`/trips/${tripId}`).then(response => setTrip(response.data.trip))
  }, [tripId])

  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MapPin />
        <span className="text-zinc-100">
          {trip?.destination ?? 'Não definido'}
        </span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar />
          <span className="text-zinc-100">
            {displayedDate ?? 'Não definida'}
          </span>
        </div>

        <div className="w-px h-6 bg-zinc-800" />

        <Button variant="secondary">
          Alterar local/data
          <Settings2 />
        </Button>
      </div>
    </div>
  )
}