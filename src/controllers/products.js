require('dotenv').config();

const dbConfig = require('../../knexfile');
const environment = process.env.NODE_ENV || 'development';
const knex = require('knex')(dbConfig[environment]);

const errorRes = require('../utils/responses/errorResponse');
const successRes = require('../utils/responses/successResponse');
const validateProduct = require('../utils/validators/validateProduct');

const createProduct = async (req, res) => {
  const {
    descricao: description,
    quantidade_estoque: amount,
    valor: value,
    categoria_id: category_id,
  } = req.body;

  try {
    const validProduct = await validateProduct(
      knex,
      {
        description,
        amount,
        value,
        category_id,
      },
      category_id,
    );
    if (validProduct) {
      return errorRes.errorResponse400(res, validProduct);
    }

    const product = await knex('produtos').insert(
      {
        descricao: description,
        valor: value,
        quantidade_estoque: amount,
        categoria_id: category_id,
      },
      '*',
    );

    successRes.successResponse200(res, product);
  } catch (error) {
    return errorRes.errorResponse500(res, error.message);
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return errorRes.errorResponse400(res, 'Parametro id é obrigatorio ');
  }
  const {
    descricao: description,
    quantidade_estoque: amount,
    valor: value,
    categoria_id: category_id,
  } = req.body;

  try {
    const validProduct = await validateProduct(
      knex,
      {
        description,
        amount,
        value,
        category_id,
      },
      category_id,
      id,
    );
    if (typeof validProduct === 'string') {
      return errorRes.errorResponse400(res, validProduct);
    }

    const product = await knex('produtos')
      .update(
        {
          descricao: description,
          valor: value,
          quantidade_estoque: amount,
          categoria_id: category_id,
        },
        '*',
      )
      .where({ id });

    successRes.successResponse200(res, product);
  } catch (error) {
    return errorRes.errorResponse500(res, error.message);
  }
};

module.exports = {
  createProduct,
  updateProduct,
};
