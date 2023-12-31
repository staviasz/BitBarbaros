const schemaClient = require("../schemas/schemaClient");
const validateSchema = require("./validateSchema");
const { cpf: CPF } = require("cpf-cnpj-validator");

const validateClient = async (database, schemaValues, id = null) => {
  try {
    const errorSchema = await validateSchema(schemaClient)(schemaValues);
    if (errorSchema) {
      return errorSchema;
    }
    const { cpf, email } = schemaValues;
    const cleanCpf = cpf.replace(/\D/g, "");

    if (!CPF.isValid(cpf)) {
      return "CPF inválido";
    }

    const promisses = [
      database("clientes").where({ email }).whereNot({ id }).first(),
      database("clientes").where({ cpf: cleanCpf }).whereNot({ id }).first(),
      validateIdClient(database, id)
    ];
    const [emailExists, cpfExists, clientExist] = await Promise.all(promisses);

    if (id) {
      if (typeof clientExist === "string") {
        return clientExist;
      }
    }

    if (emailExists) {
      return "Email já cadastrado";
    }
    if (cpfExists) {
      return "CPF já cadastrado";
    }

    return;
  } catch (error) {
    return error.message;
  }
};

const validateIdClient = async (database, id) => {
  if (!Number(id)) {
    return "O id precisa ser um número";
  }
  const client = await database("clientes").where({ id }).first();
  if (!client) {
    return "Cliente não encontrado";
  }

  return client;
};

module.exports = { validateClient, validateIdClient };
