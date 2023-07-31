<template>
	<div class="home-container layout-pd">
		<el-row :gutter="15" class="mb15"  type="flex">
			<el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16" :class="'home-media home-media-lg'">
				<el-row :gutter="15" class="home-card-one mb15">
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" :class="'home-media home-media-lg'">
						<div class="home-card-item flex">
							<div class="flex-margin flex w100" :class="` home-one-animation`">
								<el-col :span="6">
									<el-statistic title="用户" :value="15 / 100" />
								</el-col>
								<el-col :span="6">
									<el-statistic title="用户组" :value="138">

										<div style="display: inline-flex; align-items: center">

											<el-icon style="margin-left: 4px" :size="12">
												<Male />
											</el-icon>
										</div>

										<template #suffix>/100</template>
									</el-statistic>
								</el-col>
								<el-col :span="6">
									<el-statistic title="权限" :value="110" />
								</el-col>
								<el-col :span="6">
									<el-statistic title="策略" :value="562">
										<template #suffix>
											<el-icon style="vertical-align: -0.125em">
												<ChatLineRound />
											</el-icon>
										</template>
									</el-statistic>
								</el-col>
							</div>
						</div>
					</el-col>
				</el-row>
				<el-row :gutter="15" class="home-card-two mb15">
					<el-col :xs="24" :sm="10" :md="10" :lg="8" :xl="8" class="home-media">

						<el-card class="pro-container">
							<div class="img-body">
								<img :src="dynames_logo" class="image" />
							</div>
							<div class="desc-text">
								<span style="text-align: center;display:block;">Dynames（智能精准营销平台）</span>
								<div class="bottom">
									<time class="time">利用先进的算法，帮助您制定最佳的策略，实现精准投放，轻松达到营销目标</time>
									<el-button type="primary" class="button">申请试用</el-button>
								</div>
							</div>
						</el-card>

					</el-col>
					<el-col :xs="24" :sm="10" :md="10" :lg="8" :xl="8" class="home-media">

						<el-card class="pro-container">
							<div class="img-body">
								<img :src="exia_logo" class="image" />
							</div>
							<div class="desc-text">
								<span style="text-align: center;display:block;">Exia（智能导购平台）</span>
								<div class="bottom">
									<time class="time">个性化推荐，让您的购物体验更加智能化、便捷化</time>
									<el-button type="primary" class="button">申请试用</el-button>
								</div>
							</div>
						</el-card>

					</el-col>
					<el-col :xs="24" :sm="10" :md="10" :lg="8" :xl="8" class="home-media">

						<el-card class="pro-container">
							<div class="img-body">
								<img :src="impulse_logo" class="image" />
							</div>
							<div class="desc-text">
								<span  style="text-align: center;display:block;">Impules（智能外卖投放平台）</span>
								<div class="bottom">
									<time class="time">依靠智能算法和人群定向技术，将您的外卖广告准确投放给有购买意愿的用户，提升您的ROI！</time>
									<el-button type="primary" class="button">申请试用</el-button>
								</div>
							</div>
						</el-card>

					</el-col>
				</el-row>
				<el-row :gutter="15" class="home-card-two mb15">
					<el-col>
						<el-card>
							<el-steps :active="2" align-center>
								<el-step title="身份规划" description="组织成员可映射为 子账号 用户，划分到用户组" />
								<el-step title="授权产品" description="为账号授权需要使用的产品" />
								<el-step title="权限配置" description="使用权限策略表达对资源的操作限制，把策略附加给身份实现权限授予，从身份移除策略实现权限解除。" />
								<el-step title="安全治理" description="随着业务发展，您应该持续关注云上身份权限的使用情况，严格管理 AccessKey，确保启用多因素认证" />
							</el-steps>
						</el-card>
					</el-col>
				</el-row>
			</el-col>

			<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" :class="'home-media home-media-lg'" style="display: flex;flex-direction: column">
				<el-row :gutter="15" class="home-card-one mb15">
					<el-col >

						<div class="home-card-item flex">
							<el-descriptions title="账户信息" :column="2" style="width: 100%">
								<el-descriptions-item label="登录账号">
									<el-tag size="small">18911379937</el-tag>
								</el-descriptions-item>
								<el-descriptions-item label="公司名称">上海雅通数据科技有限公司</el-descriptions-item>
								<el-descriptions-item label="联系人">Robin E</el-descriptions-item>
								<el-descriptions-item label="邮箱">bin.e@163.com</el-descriptions-item>
								<el-descriptions-item label="AccessID"> 7403178178299960
								</el-descriptions-item>
								<el-descriptions-item label="AccessKey">BwHV2R8MKOE9r87T
								</el-descriptions-item>
							</el-descriptions>
						</div>


					</el-col>
				</el-row>
				<el-row :gutter="15" class="home-card-one mb15" style="flex:1">
					<el-col >
						<el-card style="height: 100%;display: flex;justify-content: space-between">
						<el-timeline>
							<el-timeline-item center  timestamp="2018-4-12" placement="top">
								
									<h4>更新Dyanems产品更新</h4>
									<p>产品更新CMS部分功能 2018-4-12 20:46</p>
								
							</el-timeline-item>
							<el-timeline-item center  timestamp="2018-4-3" placement="top">
								
									<h4>更新Exia产品更新</h4>
									<p>语音词库更新 2018-4-3 20:46</p>
								
							</el-timeline-item>
							<el-timeline-item center  timestamp="2018-4-2" placement="top">
								
									<h4>更新Exia产品更新</h4>
									<p>SKU词库更新 2018-4-2 20:46</p>
								
							</el-timeline-item>
						</el-timeline>
              <my-pagination @currentPageChange="currentPageChange" ref="myPaginationRef"></my-pagination>
					</el-card>
					</el-col>
				</el-row>

			</el-col>


		</el-row>


	</div>
</template>

<script setup lang="ts" name="home">
import {reactive, ref, computed, defineAsyncComponent} from 'vue';

import { ChatLineRound, Male } from '@element-plus/icons-vue'
import * as echarts from 'echarts';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '/@/stores/themeConfig';
import { useTagsViewRoutes } from '/@/stores/tagsViewRoutes';

import dynames_logo from '/@/assets/dynames-logo.png';
import exia_logo from '/@/assets/exia-logo.png';
import impulse_logo from '/@/assets/impulse-logo.png';



const MyPagination = defineAsyncComponent(() => import('/@/components/MyPagination.vue'));

const myPaginationRef = ref()

const currentPageChange = ()=>{
  // 获取分页组件的当前页和条数
  const {current,pageSize} = myPaginationRef.value
  console.log(current)
  console.log(pageSize)
  // TODO 这里是分页数据变化时要做的事，比如查询数据
}


</script>

<style scoped lang="scss">
$homeNavLengh: 8;
:deep(.el-card__body){
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.home-container {
	overflow: hidden;

	.home-card-one,
	.home-card-two,
	.home-card-three {
		.home-card-item {
			width: 100%;
			height: 200px;
			border-radius: 4px;
			transition: all ease 0.3s;
			padding: 20px;
			overflow: hidden;
			background: var(--el-color-white);
			color: var(--el-text-color-primary);
			border: 1px solid var(--next-border-color-light);

			&:hover {
				box-shadow: 0 2px 12px var(--next-color-dark-hover);
				transition: all ease 0.3s;
			}

			&-icon {
				width: 70px;
				height: 70px;
				border-radius: 100%;
				flex-shrink: 1;

				i {
					color: var(--el-text-color-placeholder);
				}
			}

			&-title {
				font-size: 15px;
				font-weight: bold;
				height: 30px;
			}
		}
	}

	.home-card-one {
		@for $i from 0 through 3 {
			.home-one-animation#{$i} {
				opacity: 0;
				animation-name: error-num;
				animation-duration: 0.5s;
				animation-fill-mode: forwards;
				animation-delay: calc($i/4) + s;
			}
		}
	}

	.home-card-two {
		.pro-container {
			height: 450px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.img-body {
				width: 235px;
				height: 235px;
				display: flex;
				justify-content: center;
				align-items: center;
				box-sizing: border-box;
				margin: 0 auto;

				.image {
					max-width: 235px;
					max-height: 235px;
				}
			}

			.desc-text {
				padding: 20px;

				.bottom {
					display: flex;
					flex-direction: column;

					.time {
						margin: 15px 0;
					}
				}
			}


		}
	}


}

.time {
	font-size: 12px;
	color: #999;
	width: 100% !important; //限制文本宽度
	word-wrap: break-word; //自动换行
	word-break: break-all; //自动换行（兼容字母）
	overflow: hidden; //超出隐藏
	text-overflow: ellipsis; //溢出显示省略号
	display: -webkit-box;
	-webkit-line-clamp: 3; //显示3行
	-webkit-box-orient: vertical;
	height: 48px;
}

.el-descriptions {
	margin-top: 20px;
}

:deep(.el-step__icon-inner) {
	font-size: 14px !important;
	font-weight: 700 !important;
}
</style>
