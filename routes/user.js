const { Router } = require('express')
const { check } = require('express-validator')
const { userGet, userPut, userPost, userDelete, userPatch } = require('../controllers/user')

const { isValidRole, existsMail, existsUserById } = require('../helpers/db-validators')
const { validateFields, validateJWT, isAnyRole } = require('../middlewares')

const router = Router()


router.get('/', userGet)

router.post('/', [
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(existsMail),
    check('rol').custom(isValidRole),
    validateFields
], userPost)

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existsUserById),
    check('rol').custom(isValidRole),
    validateFields
], userPut)

router.delete('/:id', [
    validateJWT,
    // isAdminRole,
    isAnyRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existsUserById),
    validateFields
], userDelete)

router.patch('/', userPatch)


module.exports = router