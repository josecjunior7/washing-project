import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import {
  FaBars, FaTachometerAlt, FaCalendarAlt, FaUsers,
  FaDollarSign, FaClock, FaCog, FaSignOutAlt, FaBullhorn
} from "react-icons/fa";
import "../Admin/Admin.css";
import "./AdminFinanceiro.css";

export default function AdminFinanceiro() {
  const navigate = useNavigate();

  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [nomeAdmin,     setNomeAdmin]     = useState("Admin");
  const [despesas,      setDespesas]      = useState([]);

  const [form, setForm] = useState({
    descricao: "",
    categoria: "Água/Luz",
    valor: "",
    vencimento: "",
    status: "Pago"
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuario"));
    if (user && user.nome) setNomeAdmin(user.nome);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const menuItems = [
    { icone: <FaTachometerAlt />, label: "Dashboard",     path: "/admin"               },
    { icone: <FaCalendarAlt />,   label: "Agendamentos",  path: "/admin/agendamentos"  },
    { icone: <FaUsers />,         label: "Clientes",      path: "/admin/clientes"      },
    { icone: <FaDollarSign />,    label: "Financeiro",    path: "/admin/financeiro", ativo: true },
    { icone: <FaClock />,         label: "Máquinas",      path: "/admin/maquinas"      },
    { icone: <FaBullhorn />,      label: "Novidades",     path: "/admin/novidades"     },
    { icone: <FaCog />,           label: "Configurações", path: "/admin/configuracoes" },
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const adicionarDespesa = () => {
    if (!form.descricao || !form.valor || !form.vencimento) {
      toast.warn("Preencha todos os campos");
      return;
    }
    const novaDespesa = { id: Date.now(), ...form, valor: Number(form.valor) };
    setDespesas([...despesas, novaDespesa]);
    toast.success("Despesa adicionada com sucesso!");
    setForm({ descricao: "", categoria: "Água/Luz", valor: "", vencimento: "", status: "Pago" });
  };

  const removerDespesa = (id) => {
    setDespesas(despesas.filter((item) => item.id !== id));
    toast.success("Despesa removida!");
  };

  const receitaTotal  = 0;
  const totalDespesas = despesas.reduce((acc, item) => acc + item.valor, 0);
  const saldo         = receitaTotal - totalDespesas;

  return (
    <section className="admin-layout">

      {sidebarAberta && (
        <div className="admin-overlay" onClick={() => setSidebarAberta(false)} />
      )}

      <aside className={`admin-sidebar ${sidebarAberta ? "aberta" : ""}`}>
        <div className="admin-sidebar-header">
          <h2>Lava Mais</h2>
          <p>Painel Admin</p>
        </div>
        <nav className="admin-sidebar-nav">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`admin-sidebar-item ${item.ativo ? "active" : ""}`}
              onClick={() => { if (item.path !== "#") navigate(item.path); setSidebarAberta(false); }}
            >
              <span className="admin-sidebar-icon">{item.icone}</span>
              <span className="admin-sidebar-label">{item.label}</span>
            </div>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <div className="admin-sidebar-item" onClick={handleLogout}>
            <span className="admin-sidebar-icon"><FaSignOutAlt /></span>
            <span className="admin-sidebar-label">Sair da conta</span>
          </div>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <section className="admin-header-left">
            <button className="admin-btn-hamburguer" onClick={() => setSidebarAberta(true)}>
              <FaBars />
            </button>
            <section className="admin-welcome">
              <span>Gerenciamento de</span>
              <h2>Financeiro</h2>
            </section>
          </section>
          <section className="admin-header-right">
            <section className="admin-avatar">{nomeAdmin.charAt(0)}</section>
          </section>
        </header>

        <section className="admin-body">
          <section className="admin-section">

            <section className="admin-metrics-grid">
              <section className="admin-metric-card cyan">
                <div className="admin-icon-box"><FaDollarSign /></div>
                <section className="admin-metric-info">
                  <h5>R$ {receitaTotal.toFixed(2)}</h5>
                  <p>Receita total</p>
                </section>
              </section>
              <section className="admin-metric-card purple">
                <div className="admin-icon-box"><FaDollarSign /></div>
                <section className="admin-metric-info">
                  <h5>R$ {totalDespesas.toFixed(2)}</h5>
                  <p>Total despesas</p>
                </section>
              </section>
              <section className="admin-metric-card cyan">
                <div className="admin-icon-box"><FaDollarSign /></div>
                <section className="admin-metric-info">
                  <h5>R$ {saldo.toFixed(2)}</h5>
                  <p>Saldo</p>
                </section>
              </section>
              <section className="admin-metric-card purple">
                <div className="admin-icon-box"><FaDollarSign /></div>
                <section className="admin-metric-info">
                  <h5>{despesas.length}</h5>
                  <p>Total de despesas</p>
                </section>
              </section>
            </section>

            <section className="admin-panel">
              <div className="admin-panel-header maquinas-header">
                <h4>LISTA DE DESPESAS</h4>
              </div>

              <table className="admin-table">
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
                      <td colSpan="6" style={{ textAlign: "center", color: "#bbb", padding: "20px" }}>
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
                          <span className={`status-pill ${item.status === "Pago" ? "ok" : "pending"}`}>
                            {item.status}
                          </span>
                        </td>
                        <td>
                          <button className="btn-acao excluir" onClick={() => removerDespesa(item.id)}>
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              <div className="form-grid">
                <div className="input-group">
                  <label>DESCRIÇÃO</label>
                  <input type="text" name="descricao" placeholder="ex: conta de água" value={form.descricao} onChange={handleChange} />
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
                  <input type="number" name="valor" placeholder="0,00" value={form.valor} onChange={handleChange} />
                </div>
                <div className="input-group">
                  <label>VENCIMENTO</label>
                  <input type="date" name="vencimento" value={form.vencimento} onChange={handleChange} />
                </div>
                <div className="input-group">
                  <label>STATUS</label>
                  <select name="status" value={form.status} onChange={handleChange}>
                    <option value="Pago">Pago</option>
                    <option value="Pendente">Pendente</option>
                  </select>
                </div>
                <button className="btn-nova-maquina" onClick={adicionarDespesa}>
                  + adicionar
                </button>
              </div>
            </section>

          </section>
        </section>
      </main>
    </section>
  );
}