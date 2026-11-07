create table if not exists clientes (
	id UUID primary key default gen_random_uuid(),
	nome text not null,
	email text not null unique,
	criado_em timestamptz not null default now()
);

create table if not exists produtos (
	id UUID primary key default gen_random_uuid(),
	nome text not null,
	preco numeric(10,2) not null constraint preco_positivo check (preco > 0),
	estoque integer not null default 0
		constraint estoque_nao_negativo check (estoque >= 0)
);

create table if not exists pedidos (
	id UUID primary key default gen_random_uuid(),
	cliente_id UUID not null,
	data timestamptz not null default now(),
	status text not null default 'pendente'
		check (status in ('pendente', 'pago', 'enviado', 'cancelado')),
	
	constraint pedidos_cliente_fk 
		foreign key (cliente_id)
		references clientes (id)
		on delete restrict
);

create table if not exists itens_pedido (
	pedido_id UUID not null 
		constraint pedido_fk
		references pedidos (id)
		on delete cascade,
	produto_id UUID not null
		constraint produto_fk
		references produtos (id)
		on delete restrict,
	quantidade integer not null
		constraint quantidade_positiva check (quantidade > 0),
	preco_unitario numeric(10,2) not null
		check (preco_unitario > 0),
		
	primary key (pedido_id, produto_id)
);
-- evita que o banco leia a tabela inteira para encontrar a linha correta.
create index if not exists idx_pedidos_cliente on pedidos (cliente_id);
create index if not exists idx_itens_produto   on itens_pedido (produto_id);