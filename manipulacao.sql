insert into clientes (nome, email)
values 
	('Murilo', 'murilo@gmail.com'),
	('Gabriel', 'gabriel@gmail.com'),
	('Pedro', 'pedro@gmail.com'),
	('Matheus', 'matheus@gmail.com'),
	('Bruno', 'bruno@gmail.com')
on conflict (email) do nothing;

alter table produtos
	add constraint unique_nome unique (nome);

insert into produtos (nome, preco, estoque)
values
	('banana', 1.00, 100),
	('maça', 2.00, 50),
	('melância', 10.00, 10),
	('abóbora', 8.00, 20),
	('macarrão', 15.00, 30),
	('caju', 20.00, 25),
	('mussarela', 17.50, 20),
	('filé_sassami', 16.00, 15),
	('molho_tomate', 15.00, 20),
	('requeijão', 13.00,10)
on conflict (nome) do nothing;

insert into pedidos (cliente_id, status) values
    ((select id from clientes where email = 'murilo@gmail.com'),   'pago'),
    ((select id from clientes where email = 'murilo@gmail.com'),   'enviado'),
    ((select id from clientes where email = 'bruno@gmail.com'), 'pago'),
    ((select id from clientes where email = 'bruno@gmail.com'), 'cancelado'),
    ((select id from clientes where email = 'gabriel@gmail.com'), 'pendente'),
    ((select id from clientes where email = 'gabriel@gmail.com'), 'pago'),
    ((select id from clientes where email = 'matheus@gmail.com'), 'enviado'),
    ((select id from clientes where email = 'matheus@gmail.com'), 'pendente')
on conflict (id) do nothing;

update produtos
set preco = preco * 1.1;

select * from clientes;
select * from produtos;
select * from pedidos;

