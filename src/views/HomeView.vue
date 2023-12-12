<template>
  <div>
    <!-- 整个页面 -->
    <el-container>
      <!-- 顶部 -->
      <el-header class="layout-header">
        <h1>シャークの運営管理プラットフォーム</h1>
      </el-header>
      <!-- 下半部分 -->
      <el-container class="layout-body">
        <!-- 下半部分的左侧边栏 -->
        <el-aside class="layout-aside">
          <el-menu
              router
              default-active="2"
              class="el-menu-vertical-demo"
              background-color="#9ed3d7"
              text-color="#fff"
              active-text-color="#fff">
            <el-menu-item index="/sys-admin/index">
              <i class="el-icon-s-home"></i>
              <span slot="title">ホーム</span>
            </el-menu-item>
            <el-submenu index="9">
              <template slot="title">
                <i class="el-icon-s-tools"></i>
                <span>一時的なページ</span>
              </template>
              <el-menu-item index="temp/test/add-new">
                <i class="el-icon-circle-plus"></i>
                <span slot="title">test</span>
              </el-menu-item>
              <el-menu-item index="/sys-admin/temp/album/add-new">
                <i class="el-icon-circle-plus"></i>
                <span slot="title">アルバムを追加</span>
              </el-menu-item>
              <el-menu-item index="/sys-admin/temp/brand/add-new">
                <i class="el-icon-circle-plus"></i>
                <span slot="title">ブランドを追加</span>
              </el-menu-item>
              <el-menu-item index="/sys-admin/temp/brand/list">
                <i class="el-icon-s-operation"></i>
                <span slot="title">ブランドリスト</span>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-s-goods"></i>
                <span>商品管理</span>
              </template>
              <el-menu-item index="/sys-admin/product/spu-management">
                <i class="el-icon-s-grid"></i>
                <span slot="title">SPU台帳</span>
              </el-menu-item>
              <el-menu-item index="/sys-admin/product/spu-add-new">
                <i class="el-icon-circle-plus"></i>
                <span slot="title">新規SPU</span>
              </el-menu-item>
              <el-menu-item index="/sys-admin/product/album-management">
                <i class="el-icon-picture"></i>
                <span slot="title">アルバム管理</span>
              </el-menu-item>
              <el-menu-item index="/sys-admin/product/category-management">
                <i class="el-icon-s-unfold"></i>
                <span slot="title">商品カテゴリー</span>
              </el-menu-item>
              <el-menu-item index="/sys-admin/product/attribute-template-management">
                <i class="el-icon-s-flag"></i>
                <span slot="title">属性テンプレート</span>
              </el-menu-item>
              <el-menu-item index="/sys-admin/product/brand-management">
                <i class="el-icon-s-data"></i>
                <span slot="title">ブランド管理</span>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-s-order"></i>
                <span>注文管理</span>
              </template>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-s-ticket"></i>
                <span>マーケティング管理</span>
              </template>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-s-shop"></i>
                <span>店舗管理</span>
              </template>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title">
                <i class="el-icon-s-check"></i>
                <span>権限管理</span>
              </template>
            </el-submenu>






          </el-menu>
        </el-aside>
        <!-- 下半部分的右侧主体 -->
        <el-main>
          <!-- 将由其它视图组件显示右侧的主体部分 -->
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
body {
  background-color: #fff !important;
}

.layout-header {
  background: #72bfc5;
  line-height: 60px;
  font-size: 16px;
}

.layout-body {
  position: absolute;
  top: 60px;
  bottom: 0;
  left: 0;
  right: 0;
}

.layout-aside {
  background: #9ed3d7;
}

.layout-aside i {
  color: #fff;
}

.el-menu-item.is-active {
  background-color: #79a1a4 !important;
}
</style>