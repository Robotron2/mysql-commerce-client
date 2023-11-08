/* eslint-disable react/prop-types */
function ProductFilter({ filter, categories, onChange, onApplyFilter }) {
	return (
		<div>
			<select
				value={filter.category}
				onChange={(e) => onChange("category", e.target.value)}
			>
				<option value="">All Categories</option>
				{categories.map((category) => (
					<option key={category.id} value={category.id}>
						{category.categoryName}
					</option>
				))}
			</select>
			<input
				type="number"
				placeholder="Min Price"
				value={filter.minPrice}
				onChange={(e) => onChange("minPrice", e.target.value)}
			/>
			<input
				type="number"
				placeholder="Max Price"
				value={filter.maxPrice}
				onChange={(e) => onChange("maxPrice", e.target.value)}
			/>
			<select
				value={filter.sort}
				onChange={(e) => onChange("sort", e.target.value)}
			>
				<option value="">Sort By</option>
				<option value="price,ASC">Price (Low to High)</option>
				<option value="price,DESC">Price (High to Low)</option>
			</select>
			<button onClick={onApplyFilter}>Apply Filter</button>
		</div>
	)
}

export default ProductFilter
