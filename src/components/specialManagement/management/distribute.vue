<template>
	<div class="content">
		<el-table :data="tableData1" ref="table1" style="width: 100%" @select="handleSelect" @selection-change="handleSelectChange">
			<el-table-column type="expand">
				<template scope="props">
					<el-table :data="props.row.tableData" ref="table2" style="width: 100%" @select="handleSelect" @selection-change="handleSelectChange">
						<el-table-column type="expand">
							<template scope="props">
								<el-table :data="props.row.tableData" ref="table3" style="width: 100%">
									<el-table-column type="expand">
										<template scope="props">
											<el-form label-position="left" inline class="demo-table-expand">
												<el-form-item label="商品名称">
													<span>{{ props.row.name }}</span>
												</el-form-item>
												<el-form-item label="所属店铺">
													<span>{{ props.row.shop }}</span>
												</el-form-item>
												<el-form-item label="商品 ID">
													<span>{{ props.row.id }}</span>
												</el-form-item>
												<el-form-item label="店铺 ID">
													<span>{{ props.row.shopId }}</span>
												</el-form-item>
												<el-form-item label="商品分类">
													<span>{{ props.row.category }}</span>
												</el-form-item>
												<el-form-item label="店铺地址">
													<span>{{ props.row.address }}</span>
												</el-form-item>
												<el-form-item label="商品描述">
													<span>{{ props.row.desc }}</span>
												</el-form-item>
											</el-form>
										</template>
									</el-table-column>

									<el-table-column type="selection" width="55">
									</el-table-column>
									<el-table-column label="表格3" prop="id">
									</el-table-column>
									<el-table-column label="表格3" prop="name">
									</el-table-column>
									<el-table-column label="表格3" prop="desc">
									</el-table-column>
								</el-table>
							</template>
						</el-table-column>

						<el-table-column type="selection" width="55">
						</el-table-column>
						<el-table-column label="表格2" prop="id">
						</el-table-column>
						<el-table-column label="表格22" prop="name">
						</el-table-column>
						<el-table-column label="表格222" prop="desc">
						</el-table-column>
					</el-table>
				</template>
			</el-table-column>

			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column label="商品 ID" prop="id">
			</el-table-column>
			<el-table-column label="商品名称" prop="name">
			</el-table-column>
			<el-table-column label="描述" prop="desc">
			</el-table-column>
		</el-table>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				multipleSelection: [],
				checked: false,
				tableData1: [{
					id: '12987122',
					name: '好滋好味鸡蛋仔',
					category: '江浙小吃、小吃零食',
					desc: '荷兰优质淡奶，奶香浓而不腻',
					address: '上海市普陀区真北路',
					shop: '王小虎夫妻店',
					shopId: '10333',
					tableData: [{
						id: '12987122',
						name: '好滋好味鸡蛋仔',
						category: '江浙小吃、小吃零食',
						desc: '荷兰优质淡奶，奶香浓而不腻',
						address: '上海市普陀区真北路',
						shop: '王小虎夫妻店',
						shopId: '10333',
						tableData: [{
							id: '12987122',
							name: '好滋好味鸡蛋仔',
							category: '江浙小吃、小吃零食',
							desc: '荷兰优质淡奶，奶香浓而不腻',
							address: '上海市普陀区真北路',
							shop: '王小虎夫妻店',
							shopId: '10333'
						}, {
							id: '12987123',
							name: '好滋好味鸡蛋仔',
							category: '江浙小吃、小吃零食',
							desc: '荷兰优质淡奶，奶香浓而不腻',
							address: '上海市普陀区真北路',
							shop: '王小虎夫妻店',
							shopId: '10333'
						}, {
							id: '12987125',
							name: '好滋好味鸡蛋仔',
							category: '江浙小吃、小吃零食',
							desc: '荷兰优质淡奶，奶香浓而不腻',
							address: '上海市普陀区真北路',
							shop: '王小虎夫妻店',
							shopId: '10333'
						}, {
							id: '12987126',
							name: '好滋好味鸡蛋仔',
							category: '江浙小吃、小吃零食',
							desc: '荷兰优质淡奶，奶香浓而不腻',
							address: '上海市普陀区真北路',
							shop: '王小虎夫妻店',
							shopId: '10333'
						}]
					}, {
						id: '12987123',
						name: '好滋好味鸡蛋仔',
						category: '江浙小吃、小吃零食',
						desc: '荷兰优质淡奶，奶香浓而不腻',
						address: '上海市普陀区真北路',
						shop: '王小虎夫妻店',
						shopId: '10333',
						tableData: [{
							id: '12987122',
							name: '好滋好味鸡蛋仔',
							category: '江浙小吃、小吃零食',
							desc: '荷兰优质淡奶，奶香浓而不腻',
							address: '上海市普陀区真北路',
							shop: '王小虎夫妻店',
							shopId: '10333'
						}, {
							id: '12987123',
							name: '好滋好味鸡蛋仔',
							category: '江浙小吃、小吃零食',
							desc: '荷兰优质淡奶，奶香浓而不腻',
							address: '上海市普陀区真北路',
							shop: '王小虎夫妻店',
							shopId: '10333'
						}, {
							id: '12987125',
							name: '好滋好味鸡蛋仔',
							category: '江浙小吃、小吃零食',
							desc: '荷兰优质淡奶，奶香浓而不腻',
							address: '上海市普陀区真北路',
							shop: '王小虎夫妻店',
							shopId: '10333'
						}, {
							id: '12987126',
							name: '好滋好味鸡蛋仔',
							category: '江浙小吃、小吃零食',
							desc: '荷兰优质淡奶，奶香浓而不腻',
							address: '上海市普陀区真北路',
							shop: '王小虎夫妻店',
							shopId: '10333'
						}]
					}, {
						id: '12987125',
						name: '好滋好味鸡蛋仔',
						category: '江浙小吃、小吃零食',
						desc: '荷兰优质淡奶，奶香浓而不腻',
						address: '上海市普陀区真北路',
						shop: '王小虎夫妻店',
						shopId: '10333'
					}, {
						id: '12987126',
						name: '好滋好味鸡蛋仔',
						category: '江浙小吃、小吃零食',
						desc: '荷兰优质淡奶，奶香浓而不腻',
						address: '上海市普陀区真北路',
						shop: '王小虎夫妻店',
						shopId: '10333'
					}]
				}, {
					id: '12987123',
					name: '好滋好味鸡蛋仔',
					category: '江浙小吃、小吃零食',
					desc: '荷兰优质淡奶，奶香浓而不腻',
					address: '上海市普陀区真北路',
					shop: '王小虎夫妻店',
					shopId: '10333',
					tableData: [{
						id: '12987122',
						name: '好滋好味鸡蛋仔',
						category: '江浙小吃、小吃零食',
						desc: '荷兰优质淡奶，奶香浓而不腻',
						address: '上海市普陀区真北路',
						shop: '王小虎夫妻店',
						shopId: '10333'
					}, {
						id: '12987123',
						name: '好滋好味鸡蛋仔',
						category: '江浙小吃、小吃零食',
						desc: '荷兰优质淡奶，奶香浓而不腻',
						address: '上海市普陀区真北路',
						shop: '王小虎夫妻店',
						shopId: '10333'
					}, {
						id: '12987125',
						name: '好滋好味鸡蛋仔',
						category: '江浙小吃、小吃零食',
						desc: '荷兰优质淡奶，奶香浓而不腻',
						address: '上海市普陀区真北路',
						shop: '王小虎夫妻店',
						shopId: '10333'
					}, {
						id: '12987126',
						name: '好滋好味鸡蛋仔',
						category: '江浙小吃、小吃零食',
						desc: '荷兰优质淡奶，奶香浓而不腻',
						address: '上海市普陀区真北路',
						shop: '王小虎夫妻店',
						shopId: '10333'
					}]
				}, {
					id: '12987125',
					name: '好滋好味鸡蛋仔',
					category: '江浙小吃、小吃零食',
					desc: '荷兰优质淡奶，奶香浓而不腻',
					address: '上海市普陀区真北路',
					shop: '王小虎夫妻店',
					shopId: '10333'
				}, {
					id: '12987126',
					name: '好滋好味鸡蛋仔',
					category: '江浙小吃、小吃零食',
					desc: '荷兰优质淡奶，奶香浓而不腻',
					address: '上海市普陀区真北路',
					shop: '王小虎夫妻店',
					shopId: '10333'
				}]
			}
		},
		methods: {
			selectRows(row, flag) {
				row.tableData.forEach((item,index) => {
//										console.log("============", this.$refs.table2);
					this.$refs.table2.toggleRowSelection(item, flag);
				});
			},
			handleSelect(selection, row) {
				
				console.log("selection:",row);
				
				
				if(selection.length > 0) {

					this.selectRows(row, true);
//					console.log("-------------", this.$refs.table2);

				} else {

					this.selectRows(row, false);
//this.$refs.table2.clearSelection();

				}
			},
			handleSelectChange(selection){
				this.multipleSelection = selection;
				
				console.log(this.multipleSelection,this.$store);
				
				
			}
		},
		watch: {}
	}
</script>

<style>

</style>