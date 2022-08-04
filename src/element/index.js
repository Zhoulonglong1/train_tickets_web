import { Select,Cascader,Steps,Step,Pagination, Collapse,CollapseItem,Autocomplete,Avatar,Option, Form,OptionGroup, Input, Tree, Dialog, Row, Col ,
    Button,FormItem,Container,Header,Aside,Menu,Submenu,MenuItemGroup,MenuItem,Main,Message,Breadcrumb,BreadcrumbItem,Card,Table,TableColumn} from 'element-ui'
const element = {
 install: function (Vue) {
  Vue.use(Select)
  Vue.use(Option)
  Vue.use(OptionGroup)
  Vue.use(Input)
  Vue.use(Tree)
  Vue.use(Dialog)
  Vue.use(Row)
  Vue.use(Col)
  Vue.use(Form)
  Vue.use(Button)
  Vue.use(FormItem)
  Vue.use(Container)
  Vue.use(Header)
  Vue.use(Aside)
  Vue.use(Menu)
  Vue.use(Submenu)
  Vue.use(MenuItemGroup)
  Vue.use(MenuItem)
  Vue.use(Main)
  Vue.use(Breadcrumb)
  Vue.use(BreadcrumbItem)
  Vue.use(Card)
  Vue.use(Table)
  Vue.use(TableColumn)
  Vue.use(Avatar)
  Vue.use(Autocomplete)
  Vue.use(Pagination)
  Vue.use(Collapse)
  Vue.use(CollapseItem)
  Vue.use(Steps)
  Vue.use(Step)
  Vue.use(Cascader)
  Vue.prototype.$message = Message
 }
}
export default element