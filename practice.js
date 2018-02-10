db.tech.insert(
	[
		{
			name: "MongoDB",
			role: "Database"
		},
		{
			name: "Express",
			role: "Web application server"
		},
		{
			name: "Angular",
			role: "Front-end Framework"
		},
		{
			name: "Node.js",
			role: "Platform"
		}
	]
)

db.hotels.update(
	{
		"name": "Grand Hotel Palatino"
	},
	{
		$set:{
			"reviews.1._id" : ObjectId()
		}
	}
	)