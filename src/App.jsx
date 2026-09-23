import { useForm } from 'react-hook-form'

function App(){
  const{register, handleSubmit,formState: { errors }, 
} = useForm()

const onSubmit = (data) => { 
  console.log('Datos del formulario:', data)
}

return(
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
        F O R M U L A R I O
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre
          </label>
          <input type="text" {...register('nombre', {
          required:'El nombre es obligatorio',
          minLenght: {
            value: 3, 
            message: 'Debe tener al menos 3 caracteres',
          },
        })}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-400"
        placeholder="Tu nombre"
        />
        {errors.nombre && (
          <p className="text-red-500 text-xs mt-1">{errors.nombre.message}</p>
        )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Correo electrónico
          </label>
          <input type="email" {...register('email', { required: 'El correo es obligatorio', pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Correo inválido',
          },
          })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="correo"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>


        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <input type="password" {...register('password',{
            required: 'La contraseña es obligatoria',
            minLength: {
              value: 6, 
              message: 'Debe tener al menos 6 caracteres',
            }
          })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder='••••••••'
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

        <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-lg transition-colors">
          Enviar
        </button>
      </form>
    </div>
  </div>
)
}

export default App;
