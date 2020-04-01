/* FUNÇÃO EM SQL */
CREATE FUNCTION trigger_set_timestamp()/* se não passar nenhum argumento , ele libera um argumento padrão */
RETURNS TRIGGER AS $$ /* argumento padrão = NEW ele representa as todas as rows */
  BEGIN
    NEW.updated_at = NOW(); 
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

/* CHAMANDO A FUNÇÃO (TRIGGER É RESPONSAVEL POR MANDAR O TRIGGER) */
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

/* FIZEMOS ESSAS FUNÇÕES PARA CONSEGUIR ATUALIZAR A DATA DE FORMA AUTOMATICA */