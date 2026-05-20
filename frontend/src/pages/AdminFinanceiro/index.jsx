import React, { useState } from "react";
import "./AdminFinanceiro.css";

export default function AdminFinanceiro() {
  const [despesas, setDespesas] = useState([]);

  const [form, setForm] = useState({
    descricao: "",
    categoria: "Água/Luz",
    valor: "",
    vencimento: "",
    status: "Pago"
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const adicionarDespesa = () => {
    if (!form.descricao || !form.valor || !form.vencimento) {
      alert("Preencha todos os campos");
      return;
    }

    const novaDespesa = {
      id: Date.now(),
      ...form,
      valor: Number(form.valor),
    };

    setDespesas([...despesas, novaDespesa]);

    setForm({
      descricao: "",
      categoria: "Água/Luz",
      valor: "",
      vencimento: "",
      status: "Pago",
    });
  };

  const removerDespesa = (id) => {
    setDespesas(despesas.filter((item) => item.id !== id));
  };

  const receitaTotal = 0;

  const totalDespesas = despesas.reduce(
    (acc, item) => acc + item.valor,
    0
  );

  const saldo = receitaTotal - totalDespesas;

  return (
    <div className="financeiro-page">
      {/* HEADER */}
      <div className="top-header">
        <div>
          <h1>financeiro</h1>
          <span>lavanderia</span>
        </div>
        <button className="mes-btn">maio 2026</button>
      </div>

      {/* CARDS */}
      <div className="cards-grid">
        <div className="finance-card receita">
          <span>RECEITA TOTAL</span>
          <h2>R$ {receitaTotal.toFixed(2)}</h2>
          <p>entradas do mês</p>
        </div>
        <div className="finance-card despesa">
          <span>TOTAL DESPESAS</span>
          <h2>R$ {totalDespesas.toFixed(2)}</h2>
          <p>saídas do mês</p>
        </div>
        <div className="finance-card saldo">
          <span>SALDO</span>
          <h2>R$ {saldo.toFixed(2)}</h2>
          <p>líquido do período</p>
        </div>
      </div>

      {/* TABELA */}
      <div className="table-container">
        <div className="table-header">
          <h3>despesas</h3>
          <span>controle de saídas</span>
        </div>

        <table>
          <thead>
            <tr>
              <th>DESCRIÇÃO</th>
              <th>CATEGORIA</th>
              <th>VENCIMENTO</th>
              <th>VALOR</th>
              <th>STATUS</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {despesas.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty">
                  nenhuma despesa cadastrada
                </td>
              </tr>
            ) : (
              despesas.map((item) => (
                <tr key={item.id}>
                  <td>{item.descricao}</td>
                  <td>{item.categoria}</td>
                  <td>{item.vencimento}</td>
                  <td>R$ {item.valor.toFixed(2)}</td>
                  <td>
                    <span className={`status ${item.status === "Pago" ? "pago" : "pendente"}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <button className="delete-btn" onClick={() => removerDespesa(item.id)}>
                      excluir
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* FORM */}
        <div className="form-grid">
          <div className="input-group">
            <label>DESCRIÇÃO</label>
            <input
              type="text"
              name="descricao"
              placeholder="ex: conta de água"
              value={form.descricao}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label>CATEGORIA</label>
            <select name="categoria" value={form.categoria} onChange={handleChange}>
              <option value="Água/Luz">Água/Luz</option>
              <option value="Produtos">Produtos</option>
              <option value="Funcionários">Funcionários</option>
              <option value="Aluguel">Aluguel</option>
            </select>
          </div>
          <div className="input-group">
            <label>VALOR (R$)</label>
            <input
              type="number"
              name="valor"
              placeholder="0,00"
              value={form.valor}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label>VENCIMENTO</label>
            <input
              type="date"
              name="vencimento"
              value={form.vencimento}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label>STATUS</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="Pago">Pago</option>
              <option value="Pendente">Pendente</option>
            </select>
          </div>
          <button className="add-btn" onClick={adicionarDespesa}>
            + adicionar
          </button>
        </div>
      </div>
    </div>
  );
}