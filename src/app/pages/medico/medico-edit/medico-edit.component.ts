import { Component } from '@angular/core';
import { Medico } from '../../../models/models.medico';
import { MedicoService } from '../../../services/medicos/medico.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertComponent } from '../../../shared/dialogs/alert/alert.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../../shared/dialogs/confirm/confirm.component';

@Component({
  selector: 'app-medico-edit',
  templateUrl: './medico-edit.component.html',
  styleUrl: './medico-edit.component.css'
})
export class MedicoEditComponent {

  Medico: Medico;


  constructor(private medicoServices: MedicoService, private activatedRoute: ActivatedRoute, private router: Router, private dialog: MatDialog) {
    this.Medico = new Medico;
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.medicoServices.getId(Number(id)).subscribe({
      next: (jsonMedico) => {
        this.Medico = jsonMedico;
      },
      error: jsonErro => {
        this.exibirMensagemErro(jsonErro.status);
      }
    })
  }


  atualizar(): void {

    if (this.validarDados()) {

      const ref = this.dialog.open(ConfirmComponent, { data: { content: 'Deseja atualizar?' } })

      ref.afterClosed().subscribe(result => {
        if (result) {
          this.medicoServices.put(this.Medico).subscribe({
            next: () => {
              this.exibirMensagemRedirecionar('Atualizado com sucesso!');
            },
            error: jsonErro => {
              this.exibirMensagemErro(jsonErro.status);
            }
          })
        }
      })
    }
  }


  excluir(): void {

    const ref = this.dialog.open(ConfirmComponent, { data: { content: 'Deseja excluir?' } })

    ref.afterClosed().subscribe(result => {
      if (result) {
        this.medicoServices.delete(this.Medico.Id).subscribe({
          next: () => {
            this.exibirMensagemRedirecionar('Excluído com sucesso!');
          },
          error: jsonErro => {
            this.exibirMensagemErro(jsonErro.status);
          }
        })
      }
    })
  }


  exibirMensagemErro(status: Number) {
    if (status === 400)
      this.exibirMensagem("Preencha os dados corretamente")

    if (status === 404)
      this.exibirMensagemRedirecionar("Dado não encontrado")

    if (status === 500)
      this.exibirMensagem("Erro no servidor, entre em contato com o suporte")

    if (status === 0)
      this.exibirMensagem("Falha na requisição, entre em contato com o suporte")
  }

  validarDados() {
    let msg = '';

    if (this.Medico.CRM.length > 9)
      msg += 'CRM deve ter no máximo 9 caracteres.\n'

    if (this.Medico.CRM == '')
      msg += 'CRM é obrigatório.\n'


    if (this.Medico.Nome.length < 3 || this.Medico.Nome.length > 100)
      msg += 'Nome deve conter de 3 a 100 caracteres.\n'

    const nomeRegex = /^[a-zA-ZÀ-ÿ\s]+$/;

    if (!nomeRegex.test(this.Medico.Nome) && this.Medico.Nome != '')
      msg += 'Nome deve conter apenas letras.\n'

    if (msg) {
      this.exibirMensagem(msg)
      return false;
    }
    return true;
  }

  exibirMensagem(msg: string) {
    this.dialog.open(AlertComponent, { data: { content: msg } });
  }


  exibirMensagemRedirecionar(msg: string) {
    const ref = this.dialog.open(AlertComponent, { data: { content: msg } })

    ref.afterClosed().subscribe(() => {
      this.router.navigate(['/medico']);
    })
  }



}
