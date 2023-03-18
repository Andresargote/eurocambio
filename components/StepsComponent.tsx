import { Steps } from 'primereact/steps'

interface StepsComponentProps {
  currentStep: number
}

export function StepsComponent({ currentStep }: StepsComponentProps) {
  const items = [
    {
      label: 'Cantidad y entrega'
    },
    {
      label: 'Información del destinario'
    },
    {
      label: 'Detalles del pago'
    },
    {
      label: 'Pagar'
    }
  ]

  return (
    <div
      className="steps-demo"
      style={{
        marginBottom: '60px'
      }}
    >
      <Steps model={items} activeIndex={currentStep} />
    </div>
  )
}
