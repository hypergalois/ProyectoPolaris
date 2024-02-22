function RequestCard({ request }) {
	return (
		<div className="card">
			<div className="card-body">
				<h5 className="card-title">{request.title}</h5>
				<p className="card-text">{request.description}</p>
			</div>
		</div>
	);
}

export default RequestCard;
