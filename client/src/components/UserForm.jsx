
import propTypes from 'prop-types'
const UserForm = ({user, onSubmit, isEdit, handleChange}) => {

    return (
        <form className="form" onSubmit={onSubmit}>
            <div>
                <label htmlFor="name">Nombre:</label>
                <input type="text" id="name" name="name" value={user.name} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="lastname">Apellido:</label>
                <input type="text" id="lastname" name="lastname" value={user.lastname} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="email">Coreo:</label>
                <input type="text" id="email" name="email" value={user.email} onChange={handleChange} />
            </div>
           {!isEdit && 
           <div>
           <div>
                <label htmlFor="password">Contraseña:</label>
                <input type="password" id="password" name="password" value={user.password} onChange={handleChange} />
            </div>
            <div>
            <label htmlFor="passwordConfirmation">Confirmar contraseña:</label>
            <input type="passwordConfirmation" id="passwordConfirmation" name="passwordConfirmation" value={user.passwordConfirmation} onChange={handleChange} />
        </div>
        </div>}
            
            

            <div>
                <button type="submit">{isEdit ? 'Update' : 'Create'}</button>
            </div>
        </form>
    )
}

UserForm.propTypes = {
    user: propTypes.object,
    onSubmit: propTypes.func,
    isEdit: propTypes.bool,
    handleChange: propTypes.func
}

export default UserForm